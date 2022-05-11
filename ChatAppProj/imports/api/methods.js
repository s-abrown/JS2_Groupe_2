import { check } from 'meteor/check';

import { customMessagesCollection, predefinedMessagesCollection, sentMessagesCollection, groupCollection } from '../db/collections';

// Method for the event below (displaying past messages from database):
Meteor.methods({
    'sentMessages.insert'(m, priority, groupId, username) {
        // adding checks to make sure all these are strings
        check(m, String);
        check(priority, String);
        check(groupId, String);
        check(username, String);

        let ts = new Date().getTime();
        let date = new Date(ts);
        date = ("00" + date.getDate()).substr(-2,2) + "." + ("00"+(Number(date.getMonth())+1)).substr(-2,2) + "." + date.getFullYear() + " " + ("00" + date.getHours()).substr(-2,2) + ":" + ("00" + date.getMinutes()).substr(-2,2);

        sentMessagesCollection.insert({
            author: username,  // needs modification
            date: date,
            message : m, // needs security improvements (later)
            priority: priority, // now it's dyinamic
            group: groupId
        })
    },
    'group.createGroup'(username){
        // adding check to make sure usernames are strings
        check(username, String);

        groupCollection.insert({
            name : 'Group name',
            admin : username, 
            users: [username],
            category: 'other'
        })
    },
    'customMessages.insert'(m, gid){
        // adding checks to make sure messages are strings
        check(m, String);
        check(gid, String);

        customMessagesCollection.insert({
            message : m,
            group : gid,
        })
    },
    'customMessages.delete'(id){
        // adding checks to make sure messages are strings
        check(id, String);
        customMessagesCollection.remove({_id:id})
    },
    'group.update'(newName, groupId){
        // adding checks to make sure group names are strings
        check(newName, String);
        check(groupId, String);
        // Update name of group
        groupCollection.update({_id: groupId}, {
            $set:{name: newName}
        })
    },
    'group.category'(groupId, groupType){
        // adding checks to make sure group categories are strings
        check(groupId, String);
        check(groupType, String);
        groupCollection.update({_id: groupId}, {
            $set:{category: groupType}
        })
    },
    'user.create'(username, password){
        // adding checks to make sure this stuff are strings
        check(username, String);
        check(password, String);
        return Accounts.createUser({
            username: username,
            password: password,
        })
    },
    'user.add'(username, groupId){
        check(username, String);
        check(groupId, String);
        let thingToCheck = Meteor.users.findOne({'username':username})

        if (thingToCheck){
            groupCollection.update({_id: groupId}, {
                $push:{users : thingToCheck._id}
            })
        }
    },
    'membersDisplay'(groupId){
        let groupUsers = groupCollection.findOne({_id:groupId}).users;
        let table = [];
        for (i = 0; i < groupUsers.length; i++){
            let userId = groupUsers[i];
            let specificUsername = Meteor.users.findOne({_id: userId}).username;
            let userObj = {_id : userId, username : specificUsername};
            table.push(userObj)
        }
        return table;
    }
})

