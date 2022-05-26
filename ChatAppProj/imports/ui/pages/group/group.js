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

// To automatically scroll down to the last message upon rendering the page:  
Template.groupPage.onRendered(function() {
    // Timeout on the rendered page:
    Meteor.setTimeout(function() {
        const s = document.getElementById('messages');
        s.scrollTop = s.scrollHeight;
    }, 100);
})

// HELPERS to feed the wanted data into the PREDEFINED messages and the CUSTOM messages: 
Template.messageBox.helpers({
    // For predefined messages: 
    predefinedMessages(){
        let groupId = localStorage.getItem("groupId");
        let categoryGroup = groupCollection.findOne({'_id' : groupId}).category;
        return predefinedMessagesCollection.find({category: categoryGroup}).fetch({});
    },
    // For custom messages: 
    customMessages(){
        let groupId = localStorage.getItem("groupId");
        return customMessagesCollection.find({group: groupId}).fetch();
    },
});

// Creating the helper to feed data to the group template 
Template.groupMessages.helpers({
    sentMessages(){
        // Fetch and display the group name: 
        let groupId = localStorage.getItem("groupId");
        return sentMessagesCollection.find({group: groupId}).fetch();
    },
});

// HELPER to feed the wanted data to display the name of a group: 
Template.groupName.helpers({
    name(){
        // fetching the group name from the local storage on Meteor
        let groupId = localStorage.getItem("groupId");
        // Display the group name
        let returnedGroupName = groupCollection.findOne({"_id": groupId}).name;
        return returnedGroupName
    }
});

// EVENT to reroute to 404 page if not logged in:
Template.rr2nf_01.onRendered(function(){
    FlowRouter.go("notFound");
});

// EVENT -  upon clicking on a message it gets sent and is displayed onscreen. /!\ This includes a mouse tracking in order to determine which PRIORITY users choose for each message:
Template.messageBox.events({
    'click .predefinedMessage' : function (e){
        let w = window.innerWidth;
        let h = window.innerHeight;

        let pm = document.getElementsByClassName("predefinedMessage");
        let mouse = [];
        let priority = null;

        // Tracking mouse position (used later in code)
        document.addEventListener("mousemove", e => {
            mouse = [e.x, e.y];
        });

        // Updating displayed predifined messages
        pm = document.getElementsByClassName("predefinedMessage");

        // Getting message's x1 and x2 position on screen
        let c = e.target.offsetWidth;
        let x1 = 0;
        let x2 = e.target.offsetWidth;
        let inc = (x2-x1)/3;

        // Defining intervals and checking mouse position
        let pos_x = e.offsetX

        if( (pos_x >= x1) && (pos_x < x1+inc) ){
            priority = "priority_high";
        }
        else if( (pos_x >= x1+inc) && (pos_x < x1+inc*2) ){
            priority = "priority_medium";
        }
        else if( (pos_x >= x1+inc*2) && (pos_x <= x1+inc*3) ){
            priority = "priority_low";
        }
        else{
            priority = "priority_low";
        }

        let groupId = localStorage.getItem("groupId");
        let user = Meteor.users.findOne({'_id' : Meteor.userId()}).username;
        Meteor.call("sentMessages.insert", e.target.innerText, priority, groupId, user);

        // Waiting a bit to scroll down automatically so that when we send a message it appears at the bottom
        Meteor.setTimeout(function() {
            const s = document.getElementById('messages');
            s.scrollTop = s.scrollHeight;
        }, 100);
    },
});
 
// EVENTS for updating a group's name: 
Template.groupPage.events({
    'change #groupTitle' : function (e){
        let newName = e.target.value;
        let groupId = localStorage.getItem("groupId");

        Meteor.call("group.update", newName, groupId);
    },
    // Reroute to the menu page upon clicking the go back div
    'click #goBack' : function(e){
        FlowRouter.go('menu');
    }, 
    // Making sure that the admin has access to the group settings
    'click #groupSettings' : function(e){
        let groupId = localStorage.getItem("groupId");
        let adminGroup = groupCollection.find({'_id' : groupId}).fetch()[0].admin;
        let userId = Meteor.userId();
        if (adminGroup === userId){
            FlowRouter.go('manageGroup');
        } else {
            alert('You are not authorised to change the group settings.');
        }
    },
    // fetching messages:
    'click #typeMessage': function(e) {
        let messageBox = document.getElementById("messageBox");
        let messages = document.getElementById("messages");
        // Displaying the message boxes with some styling: 
        messageBox.style.display = "flex";
        messages.setAttribute("class", "blurred");
    },
    // Styling messages we click on: 
    'click #messages': function(e) {
        let mb = document.getElementById("messageBox");
        mb.style.display = "none";
        document.getElementById("messages").removeAttribute("class", "blurred");
    }
});