import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { predefinedMessagesCollection, sentMessagesCollection, customMessagesCollection, groupCollection } from '/imports/db/collections';

import './group.html';

// Subscribe client to collections
if (Meteor.isClient){
    Meteor.subscribe('predefinedMessages');
    Meteor.subscribe('sentMessages');
    Meteor.subscribe('publishGroups');
}

// Automatically scrolls down
Template.groupPage.onRendered(function() {
    Meteor.setTimeout(function() {
        const s = document.getElementById('messages');
        s.scrollTop = s.scrollHeight;
    }, 100); // 100ms to wait for messages to be fed
});

// Reroute to 404 page
Template.rr2nf_01.onRendered(function(){
    FlowRouter.go("notFound");
});

//---------//
// HELPERS 
//---------//

// Feeds predifined and custom messages 
Template.messageBox.helpers({
   // Predifined messages
    predefinedMessages(){
        // Gets group id
        let groupId = localStorage.getItem("groupId");
        // Gets group category
        let categoryGroup = groupCollection.findOne({'_id' : groupId}).category;
        // Returns predefined messages for found group category
        return predefinedMessagesCollection.find({category: categoryGroup}).fetch({});
    },
    // Custom messages: 
    customMessages(){
        // Gets group id
        let groupId = localStorage.getItem("groupId");
        // Returns custom messages for specific group
        return customMessagesCollection.find({group: groupId}).fetch();
    },
});

// Sent messages
Template.groupMessages.helpers({
    sentMessages(){
        // Gets group id
        let groupId = localStorage.getItem("groupId");
        // Returns sent messages for specific group
        return sentMessagesCollection.find({group: groupId}).fetch();
    },
});

// Name of the group
Template.groupName.helpers({
    name(){
        // Gets group id
        let groupId = localStorage.getItem("groupId");
        // Gets the group name from db based on group id
        let returnedGroupName = groupCollection.findOne({"_id": groupId}).name;
        // Returns group name
        return returnedGroupName
    }
});

//--------//
// EVENTS
//--------//

Template.messageBox.events({
    // Pop up
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

        // Selection of message to send
        pm = document.getElementsByClassName("predefinedMessage");

        // Getting message's x1 and x2 position on screen
        let c = e.target.offsetWidth;
        let x1 = 0;
        let x2 = e.target.offsetWidth;
        let inc = (x2-x1)/3;

        // Defining intervals and checking mouse position
        let pos_x = e.offsetX

        // Determining priority based on mouse position (and not div)
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

        // Gets user who is sending the message
        let groupId = localStorage.getItem("groupId");
        let user = Meteor.users.findOne({'_id' : Meteor.userId()}).username;

        // Calls method to insert message in db
        Meteor.call("sentMessages.insert", e.target.innerText, priority, groupId, user);

        // Scrolls down automatically once a message is sent
        Meteor.setTimeout(function() {
            const s = document.getElementById('messages');
            s.scrollTop = s.scrollHeight;
        }, 100);
    },
});
 
// Updates a group name 
Template.groupPage.events({
    'change #groupTitle' : function (e){
        // Gets new name
        let newName = e.target.value;
        // Gets group id
        let groupId = localStorage.getItem("groupId");
        // Updates server side
        Meteor.call("group.update", newName, groupId);
    },
    // Reroutes to menu
    'click #goBack' : function(e){
        FlowRouter.go('menu');
    }, 
    // Reroutes to settings (only for admin)
    'click #groupSettings' : function(e){
        // Gets group id
        let groupId = localStorage.getItem("groupId");
        // Finds admin of group
        let adminGroup = groupCollection.find({'_id' : groupId}).fetch()[0].admin;
        // Gets user id
        let userId = Meteor.userId();
        // Compares user id with group admin id
        if (adminGroup === userId){
            FlowRouter.go('manageGroup');
        } else {
            alert('You are not authorised to change the group settings.');
        }
    },
    // Displays pop up
    'click #typeMessage': function(e) {
        let messageBox = document.getElementById("messageBox");
        let messages = document.getElementById("messages");
        // Displays pop up
        messageBox.style.display = "flex";
        // Blurs the background (sent messages)
        messages.setAttribute("class", "blurred");
    },
    // Hides pop up
    'click #messages': function(e) {
        let mb = document.getElementById("messageBox");
        // Hides pop up
        mb.style.display = "none";
        // Unblurs sent messages
        document.getElementById("messages").removeAttribute("class", "blurred");
    }
});