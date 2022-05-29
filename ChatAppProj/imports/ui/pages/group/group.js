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
    // The Timeout was set to a 100 to allow for the data to be fed to the page before rendering
    Meteor.setTimeout(function() {
        const s = document.getElementById('messages');
        s.scrollTop = s.scrollHeight;
    }, 100);
});

// Reroute to 404 page if user is not logged in:
Template.rr2nf_01.onRendered(function(){
    FlowRouter.go("notFound");
});

// HELPERS 
// To feed the wanted data into the PREDEFINED messages and the CUSTOM messages: 
Template.messageBox.helpers({
    // For predefined messages: 
    predefinedMessages(){
        let groupId = localStorage.getItem("groupId");
        // In the groupCollection we first fin the groupId with the right id and then look for it's type
        let categoryGroup = groupCollection.findOne({'_id' : groupId}).category;
        // Return the predifined messages that correspond to the specific group type
        return predefinedMessagesCollection.find({category: categoryGroup}).fetch({});
    },
    // For custom messages: 
    customMessages(){
        let groupId = localStorage.getItem("groupId");
        return customMessagesCollection.find({group: groupId}).fetch();
    },
});

// Creating the helper to feed data to the groupMessages template (sent messages):
Template.groupMessages.helpers({
    sentMessages(){ 
        let groupId = localStorage.getItem("groupId");
        // All the messages sent in the group are fetched here and displayed according to the template
        return sentMessagesCollection.find({group: groupId}).fetch();
    },
});

// To feed the wanted data to display the name of a group: 
Template.groupName.helpers({
    name(){
        let groupId = localStorage.getItem("groupId");
        // Display the group name
        let returnedGroupName = groupCollection.findOne({"_id": groupId}).name;
        return returnedGroupName
    }
});



// EVENTS
// Upon clicking on a message it gets sent and is displayed onscreen. /!\ This includes a mouse tracking in order to determine which priority users choose for each message:
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

        // Selection of message to send
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

        // Identifying the user who is sending the message
        let groupId = localStorage.getItem("groupId");
        let user = Meteor.users.findOne({'_id' : Meteor.userId()}).username;
        // The method is called to insert the new information in the database (server side) wich will then be displayed thanks to the helper
        Meteor.call("sentMessages.insert", e.target.innerText, priority, groupId, user);

        // Scroll down automatically so that when a message is sent it appears at the bottom
        Meteor.setTimeout(function() {
            const s = document.getElementById('messages');
            s.scrollTop = s.scrollHeight;
        }, 100);
    },
});
 
// Updating a group's name 
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
    // Rerouting to the settings page if the user is the admin of the group
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
        // Displaying the message box 
        messageBox.style.display = "flex";
        // Blurring the background of pop-up
        messages.setAttribute("class", "blurred");
    },
    // Clicking on the messages to make the pop-up disappear and the sentMessages visible again 
    'click #messages': function(e) {
        let mb = document.getElementById("messageBox");
        mb.style.display = "none";
        document.getElementById("messages").removeAttribute("class", "blurred");
    }
});