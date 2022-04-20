import { Meteor } from 'meteor/meteor';
import { predefinedMessages } from '../imports/db/collections';

const addPredefinedMessages = message => predefinedMessages.insert(message)

const messages = [
    {
        message: 'Hello',
        category: 0
    },
    {
        message: 'Bye',
        category: 1
    },
    {
        message: 'Call me',
        category: 1
    }
]

Meteor.startup(() => {
    // Dropping (deleting stuff that is already in there) of the collection 
    predefinedMessages.rawCollection().drop();
    // Adding predefined messages to the collection
    messages.forEach(addPredefinedMessages);
});