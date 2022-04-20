import { check } from 'meteor/check';
import { predefinedMessagesCollection } from '/imports/db/collections';
import { sentMessagesCollection } from '/imports/db/collections';

// Method for the event below (displaying past messages from database):
Meteor.methods({
    'sentMessages.insert'(m) {
        check(m, String);

        sentMessagesCollection.insert({
            author: 'default',  // needs modification
            date: new Date(),
            message : m, // needs security improvements (later)
        })
    },
});