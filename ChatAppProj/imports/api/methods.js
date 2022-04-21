import { check } from 'meteor/check';
import { customMessagesCollection, predefinedMessagesCollection, sentMessagesCollection, groupCollection } from '../db/collections';

// Method for the event below (displaying past messages from database):
Meteor.methods({
    'sentMessages.insert'(m, priority, groupId, username) {
        check(m, String);

        let ts = new Date().getTime();
        let date = new Date(ts);
        date = ("00" + date.getDate()).substr(-2,2) + "." + ("00" + date.getMonth()).substr(-2,2) + "." + date.getFullYear() + " " + ("00" + date.getHours()).substr(-2,2) + ":" + ("00" + date.getMinutes()).substr(-2,2);

        sentMessagesCollection.insert({
            author: username,  // needs modification
            date: date,
            message : m, // needs security improvements (later)
            priority: priority, // now it's dyinamic
            group: groupId
        })
    },
    'group.createGroup'(){
        groupCollection.insert({
            name : 'Group name',
            admin : 'user', 
            users: ['user'],
        })
    },
    'customMessages.insert'(m, gid){
        //Needs security check, and we have to add user
        customMessagesCollection.insert({
            message : m,
            group : gid,
        })
    },
    'customMessages.delete'(id){
        // Add user
        customMessagesCollection.remove({_id:id})

    },
    'group.update'(newName, groupId){
        // Update name of group
        groupCollection.update({_id: groupId}, {
            $set:{name: newName}
        })
    }
});

