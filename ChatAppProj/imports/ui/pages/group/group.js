import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { predefinedMessagesCollection, sentMessagesCollection, customMessagesCollection, groupCollection } from '/imports/db/collections';

import './group.html';

// Subscribe the client to the collections
if (Meteor.isClient){
    Meteor.subscribe('predefinedMessages');
    Meteor.subscribe('sentMessages');
    Meteor.subscribe('publishGroups');
}

// Creating the helper for the predefined messages (predefined & custom)
Template.messageBox.helpers({
    predefinedMessages(){
        let groupId = localStorage.getItem("groupId");
        let categoryGroup = groupCollection.find({'_id' : groupId}).fetch()[0].category;
        return predefinedMessagesCollection.find({category: categoryGroup}).fetch({});
    },
    customMessages(){
        let groupId = localStorage.getItem("groupId");
        return customMessagesCollection.find({group: groupId}).fetch();
    },
});

// Creating the helper to feed data to the group template 
Template.groupMessages.helpers({
    sentMessages(){
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

// event to reroute to 404 page if not logged in
Template.rr2nf_01.onRendered(function(){
    FlowRouter.go("notFound");
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
        let groupId = localStorage.getItem("groupId");
        let adminGroup = groupCollection.find({'_id' : groupId}).fetch()[0].admin;
        let userId = Meteor.userId();
        if (adminGroup === userId){
            FlowRouter.go('manageGroup');
        } else {
            alert('You are not autorised to change the group settings')
        }
    }, 
});