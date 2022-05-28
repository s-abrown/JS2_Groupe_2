import { Meteor } from 'meteor/meteor';

import { groupCollection, predefinedMessagesCollection, customMessagesCollection, sentMessagesCollection } from '../imports/db/collections';

import '/imports/api/methods';

const addPredefinedMessages = message => predefinedMessagesCollection.insert(message)

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

// Publish collection from server to client
Meteor.publish('predefinedMessages', function publishPredefinedMessages(){
    return predefinedMessagesCollection.find({});
});

// Publish collection from server to client of sent messages --> temporary, we will need to add the id_group
Meteor.publish('sentMessages', function publishSentMessages(){
    return sentMessagesCollection.find({});
});

// Publish groups --> only the ones in which the user is in
Meteor.publish('publishGroups', function f(){
    return groupCollection.find({});
});

// Publish custom messages for ManageGroup page
Meteor.publish('customMessages', function publishCustomMessages(){
    return customMessagesCollection.find({});
});

Meteor.startup(() => {
    // Dropping (deleting stuff that is already in there) of the collection 
    predefinedMessagesCollection.rawCollection().drop();
    // Adding predefined messages to the collection
    messages.forEach(addPredefinedMessages);
});

