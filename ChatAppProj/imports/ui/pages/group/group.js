import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';

import { predefinedMessagesCollection, sentMessagesCollection, customMessagesCollection, groupCollection } from '/imports/db/collections';

import './group.html';

// Unusable !!
const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

// Needs security fixes -> EVERYWHERE !!

// Subscribe the client to the collections
if (Meteor.isClient){
    Meteor.subscribe('predefinedMessages');
    Meteor.subscribe('sentMessages');
    Meteor.subscribe('publishGroups');
}

// Creating the helper for the predefined messages (predefined & custom)
Template.messageBox.helpers({
    predefinedMessages(){
        return predefinedMessagesCollection.find({}).fetch({});
    },
    customMessages(){
        let groupId = localStorage.getItem("groupId");
        return customMessagesCollection.find({group: groupId}).fetch();
    },
});

// Creating the helper to feed data to the group template 
Template.groupMessages.helpers({
    sentMessages(){
        // Going for the "session" way -> DOESN'T WORK !
        // let groupId = Session.get("groupId");

        // Going for the "javascript way" -> DOESN'T WORK !
        // let groupId = Session.keys.groupId;

        // Going for the desperate way -> WORKS !
        let groupId = localStorage.getItem("groupId");
        return sentMessagesCollection.find({group: groupId}).fetch();
    },
});

// Creating the helper to get the group name -> DOESN'T WORK !
Template.groupName.helpers({
    group(){
        // let groupId = localStorage.getItem("groupId");
        // console.log(groupId)
        // return groupCollection.find({"_id": groupId}).fetch();
    }
});

// Listener/ event: upon clicking on a message it gets sent and is displayed onscreen. 
Template.messageBox.events({
    'click .predefinedMessage' : function (e){
        let groupId = localStorage.getItem("groupId");
        let user = Meteor.users.findOne({'_id' : Meteor.userId()}).username;
        Meteor.call("sentMessages.insert", e.target.innerText, priority, groupId, user);
    },
});
 
// Event for updating group's name
Template.groupPage.events({
    'change #groupTitle' : function (e){
        let newName = e.target.value;
        let groupId = localStorage.getItem("groupId");

        Meteor.call("group.update", newName, groupId);
    },
    'click #goBack' : function(e){
        FlowRouter.go('menu');
    }, 
    'click #groupSettings' : function(e){
        FlowRouter.go('manageGroup');
    }, 
});