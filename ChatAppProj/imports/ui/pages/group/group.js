import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { predefinedMessagesCollection, sentMessagesCollection, customMessagesCollection } from '/imports/db/collections';

import './group.html';

// Unusable !!
const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();


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
    customMessages(){
        let groupId = localStorage.getItem("groupId");
        return customMessagesCollection.find({group: groupId}).fetch();
    }
});

// Creating the helper to feed data to the group template
Template.groupMessages.helpers({
    sentMessages(){
        // Getting stored groupId -> Needs security checks

        // HAHA WTF THAT DOESNT WORK
        // let groupId = Session.get("groupId");

        // Going for the "javascript way"
        // let groupId = Session.keys.groupId;

        let groupId = localStorage.getItem("groupId");
        return sentMessagesCollection.find({group: groupId}).fetch();
    },
});

// Listener/ event: upon clicking on a message it gets sent and is displayed onscreen. 
Template.messageBox.events({
    'click .predefinedMessage' : function (e){
        let groupId = localStorage.getItem("groupId");

        const getUser = () => Meteor.user();

        Meteor.call("sentMessages.insert", e.target.innerText, priority, groupId, getUser());
    },
});
 
