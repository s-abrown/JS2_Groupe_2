import { Meteor } from 'meteor/meteor';

import { groupCollection, predefinedMessagesCollection, customMessagesCollection, sentMessagesCollection } from '../imports/db/collections';

import '/imports/api/methods';

const messages = [
    // Category: Work
    {
        message: 'Assignment completed',
        category: 'work'
    },
    {
        message: 'Call me',
        category: 'work'
    },
    {
        message: 'Meeting in 15 minutes',
        category: 'work'
    },
    {
        message: 'Good work',
        category: 'work'
    },
    {
        message: 'Running late for work',
        category: 'work'
    },
    {
        message: 'Be there soon',
        category: 'work',
    },
    {
        message: 'Assignment has been updated',
        category: 'work'
    },
    // Category: Travel
    {
        message: 'Just landed',
        category: 'travel'
    },
    {
        message: 'Meeting at our assigned spot in 15 minutes',
        category: 'travel'
    },
    {
        message: 'Holiday, water plants',
        category: 'travel'
    },
    {
        message: 'Bag delivery at Geneva Airport is delayed',
        category: 'travel'
    },
    // Category: Friends
    {
        message: 'Be there soon',
        category: 'friends'
    },
    {
        message: 'Meet up now',
        category: 'friends'
    },
    {
        message: 'Call me',
        category: 'friends'
    },
    {
        message: 'Food?',
        category: 'friends'
    },
    {
        message: 'See you soon',
        category: 'friends'
    },
]

// Inserts all predefined message in collection
const addPredefinedMessages = message => predefinedMessagesCollection.insert(message)

// Publishes collection of predifined messages
Meteor.publish('predefinedMessages', function publishPredefinedMessages(){
    return predefinedMessagesCollection.find({});
});

// Publishes custom messages collections
Meteor.publish('customMessages', function publishCustomMessages(){
    return customMessagesCollection.find({});
});

// Publishes collection of sent messages 
Meteor.publish('sentMessages', function publishSentMessages(){
    return sentMessagesCollection.find({});
});

// Publishes group collection
Meteor.publish('publishGroups', function f(){
    return groupCollection.find({});
});

Meteor.startup(() => {
    // Drops what is already in collection 
    predefinedMessagesCollection.rawCollection().drop();
    // Adds predefined messages to the collection
    messages.forEach(addPredefinedMessages);
});