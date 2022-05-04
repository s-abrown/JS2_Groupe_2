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
        let categoryGroup = groupCollection.findOne({'_id' : groupId}).category;
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
    name(){
        let groupId = localStorage.getItem("groupId");
        // console.log(groupId)
        let returnedGroupName = groupCollection.findOne({"_id": groupId}).name;
        console.log(returnedGroupName)
        return returnedGroupName
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
    'click #typeMessage': function() {
        let w = window.innerWidth;
        let h = window.innerHeight;

        let typeMessage = document.getElementById("typeMessage");
        let messageBox = document.getElementById("messageBox");
        let messages = document.getElementById("messages");
        let pm = document.getElementsByClassName("predefinedMessage");
        let mouse = [];
        let priority = null;
        
        // Tracking mouse position (used later in code)
        document.addEventListener("mousemove", e => {
            mouse = [e.x, e.y];
        });

        // Displaying the message box
        messageBox.style.display = "flex";
        messages.setAttribute("class", "blurred");

        // Updating predifined messages
        pm = document.getElementsByClassName("predefinedMessage");

        for(m of pm){
            m.addEventListener("click", function(){
                let id = this.getAttribute("id");

                // Getting message's x1 and x2 position on screen
                let c = m.getBoundingClientRect();
                let x1 = +c.left.toFixed();
                let x2 = Number(x1 + c.width);
                let inc = (x2-x1)/3;

                // Defining intervals and checking mouse position
                let pos_x = mouse[0];
                
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
            });
        }

        // Hiding the message box when clicking on the main box
        messages.addEventListener("click", function(){
            messageBox.style.display = "none";
            messages.removeAttribute("class", "blurred");
        });
    }
});