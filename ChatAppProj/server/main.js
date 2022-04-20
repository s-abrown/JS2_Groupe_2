import { Meteor } from 'meteor/meteor';
import { predefinedMessagesCollection } from '../imports/db/collections';
import '/imports/api/methods';

const addPredefinedMessages = message => predefinedMessagesCollection.insert(message)

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

// Publish collection from server to client
Meteor.publish('predefinedMessages', function publishPredefinedMessages(){
    return predefinedMessagesCollection.find({category: 1});
});

// Publish collection from server to client of sent messages --> temporary, we will need to add the id_group
Meteor.publish('sentMessages', function publishSentMessages(){
    return sentMessagesCollection.find({});
});

Meteor.startup(() => {
    // Dropping (deleting stuff that is already in there) of the collection 
    predefinedMessagesCollection.rawCollection().drop();
    // Adding predefined messages to the collection
    messages.forEach(addPredefinedMessages);
});