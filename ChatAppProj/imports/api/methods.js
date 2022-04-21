import { check } from 'meteor/check';
import { predefinedMessagesCollection } from '/imports/db/collections';
import { sentMessagesCollection } from '/imports/db/collections';
import { groupCollection } from '/imports/db/collections';

// Method for the event below (displaying past messages from database):
Meteor.methods({
    'sentMessages.insert'(m, priority) {
        check(m, String);

        let ts = new Date().getTime();
        let date = new Date(ts);
        date = ("00" + date.getDate()).substr(-2,2) + "." + ("00" + date.getMonth()).substr(-2,2) + "." + date.getFullYear() + " " + ("00" + date.getHours()).substr(-2,2) + ":" + ("00" + date.getMinutes()).substr(.2,2);

        sentMessagesCollection.insert({
            author: 'user',  // needs modification
            date: date,
            message : m, // needs security improvements (later)
            priority: priority // now it's dyinamic
        })
    },
    'group.createGroup'(){
        groupCollection.insert({
            name : 'New group',
            admin : 'user', 
            users: ['user'],
        })
    }
});
