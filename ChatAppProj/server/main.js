import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { groupCollection, predefinedMessagesCollection, customMessagesCollection, sentMessagesCollection } from '../imports/db/collections';

import '/imports/api/methods';

const addPredefinedMessages = message => predefinedMessagesCollection.insert(message)

const messages = [
    // Category: Default
    {
        message: 'Hello',
        category: 'default'
    },
    {
        message: 'Bye',
        category: 'default'
    },
    {
        message: 'Call me ASAP',
        category: 'default'
    },
    // Category: Work
    {
        message: 'Assignment completed',
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
        message: 'Be there soon',
        category: 'work'
    }
    // Category: Travel
    {
        message: 'Just landed',
        category: 'travel'
    },
    {
        message: 'Leaving for a couple of weeks, bye',
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
    {
        message: 'Be there soon',
        category: 'friends'
    },
    {
        message: 'Meet up now',
        category: 'friends'
    },
    {
        message: 'Veryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryveryverylongmessage',
        category: 'friends'
    },
    // Friends

]

// Creating a default user for the app
// "We just create a new user on server startup if we didn't find it in the database":
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

// Publish collection from server to client
Meteor.publish('predefinedMessages', function publishPredefinedMessages(){
    return predefinedMessagesCollection.find({});
});

// Publish collection from server to client of sent messages --> temporary, we will need to add the id_group
Meteor.publish('sentMessages', function publishSentMessages(){
    return sentMessagesCollection.find({});
});

// Publish groups --> only the ones in which the user is
Meteor.publish('publishGroups', function f(){
    return groupCollection.find({});
});

// Publish custom messages for ManageGroup page
Meteor.publish('customMessages', function publishCustomMessages(){
    return customMessagesCollection.find({});
});

Meteor.startup(() => {
    // Creating a new user on server startup if won't find it in the database
    /* if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        })
    } else {
        console.log(Meteor.users.findOne())
    } */

    // Dropping (deleting stuff that is already in there) of the collection 
    predefinedMessagesCollection.rawCollection().drop();
    // Adding predefined messages to the collection
    messages.forEach(addPredefinedMessages);
});

