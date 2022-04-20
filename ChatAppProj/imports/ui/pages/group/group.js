import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'

import { predefinedMessagesCollection } from '/imports/db/collections';
import { sentMessagesCollection } from '/imports/db/collections';

import './group.html';

// Subscribe the client to the collection for predefined messages
if (Meteor.isClient){
    Meteor.subscribe('predefinedMessages');
}
// For sent messages (in the group)
if (Meteor.isClient){
    Meteor.subscribe('sentMessages');
}

// Creating the helper to feed data to the group template
Template.messageBox.helpers({
    predefinedMessages(){
        return predefinedMessagesCollection.find({}).fetch({});
    },
});

// Creating the helper to feed data to the group template
Template.groupMessages.helpers({
    sentMessages(){
        return sentMessagesCollection.find({}).fetch({});
    },
});

// Listener/ event: upon clicking on a message it gets sent and is displayed onscreen. 
Template.messageBox.events({
    'click .predefinedMessage' : function (e){
        Meteor.call("sentMessages.insert", e.target.innerText);
    },
});
 
