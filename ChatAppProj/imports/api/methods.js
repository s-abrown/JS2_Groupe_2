import { check } from 'meteor/check';

import { customMessagesCollection, predefinedMessagesCollection, sentMessagesCollection, groupCollection } from '../db/collections';

Meteor.methods({
    //---------------------//
    // Group page methods
    //---------------------//

    // Inserts new message
    'sentMessages.insert'(m, priority, groupId, username) {
        // Checks types
        check(m, String);
        check(priority, String);
        check(groupId, String);
        check(username, String);

        // Gets and formats new date
        let ts = new Date().getTime();
        let date = new Date(ts);
        date = ("00" + date.getDate()).substr(-2,2) + "." + ("00"+(Number(date.getMonth())+1)).substr(-2,2) + "." + date.getFullYear() + " " + ("00" + date.getHours()).substr(-2,2) + ":" + ("00" + date.getMinutes()).substr(-2,2);

        // Inserts message in db 
        sentMessagesCollection.insert({
            author: username,
            date: date,
            message : m,
            priority: priority,
            group: groupId
        });
    },
    // Updates group name
    'group.update'(newName, groupId){
        // Checks types
        check(newName, String);
        check(groupId, String);

        // Updates name in db
        groupCollection.update({_id: groupId}, {
            $set:{name: newName}
        });
    },

    //--------------------------//
    // Home page (menu) method
    //--------------------------//

    // Creates a new group
    'group.createGroup'(id){
        // Checks types
        check(id, String);

        // Gets username from db
        let username = Meteor.users.findOne({'_id':id}).username;

        // Inserts new group in db
        groupCollection.insert({
            name : 'Group name',
            admin : id, 
            users: [{_id: id, username: username}],
            category: 'other'
        });
    },

    //-------------------------------------//
    // Group settings (manageGroup) methods
    //-------------------------------------//

    // Creates a new custom message
    'customMessages.insert'(m, gid){
        // Checks types
        check(m, String);
        check(gid, String);

        // Inserts a custom message in db
        customMessagesCollection.insert({
            message : m,
            group : gid,
        });
    },

    // Deletes a custom message
    'customMessages.delete'(id){
        // Checks types
        check(id, String);

        // Removes custom message from db
        customMessagesCollection.remove({_id:id});
    },

    // Changes the group category
    'group.category'(groupId, groupType){
        // Checks types
        check(groupId, String);
        check(groupType, String);

        // Updates group category
        groupCollection.update({_id: groupId}, {
            $set:{category: groupType}
        });
    },

    // Adds user to group
    'user.add'(username, groupId){
        // Checks types
        check(username, String);
        check(groupId, String);

        // Finds user
        let user = Meteor.users.findOne({'username':username})

        // Adds user to db if they exist
        if (user){
            groupCollection.update({_id: groupId}, {
                $push:{users : {_id:user._id, username: username}}
            });
        }
    },

    // Displays group members
    'membersDisplay'(groupId){
        // Finds users of a group
        let groupUsers = groupCollection.findOne({_id:groupId}).users;

        // Stores users in a table as objects
        let table = [];
        for (i = 0; i < groupUsers.length; i++){
            let userId = groupUsers[i];
            let specificUsername = Meteor.users.findOne({_id: userId}).username;
            let userObj = {_id : userId, username : specificUsername};
            table.push(userObj)
        }

        return table;
    },

    //---------------------//
    // Sign up page method
    //---------------------//

    // Creates a new user
    'user.create'(username, password){
        // Checks types
        check(username, String);
        check(password, String);

        // Creates a new user with username and password
        return Accounts.createUser({
            username: username,
            password: password,
        });
    }
})