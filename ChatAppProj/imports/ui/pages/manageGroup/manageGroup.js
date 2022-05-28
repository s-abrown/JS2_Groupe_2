import { check } from 'meteor/check';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { customMessagesCollection, groupCollection } from '/imports/db/collections';

import './manageGroup.html';

// Custom messages subscription so that users can see displayed custom messages:
if (Meteor.isClient){
    Meteor.subscribe('customMessages');
}

//  HELPERS to feed data to display custom messages and group memners:
Template.manageGroup.helpers({
    // For custom messages:
    customMessages(){
        let groupId = localStorage.getItem("groupId");
        return customMessagesCollection.find({group: groupId}).fetch();
    },
    // For upadting the users in the group member list
    getUsers(){
        // Display group members, filtered by group ID:
        let groupId = localStorage.getItem("groupId");
        let users = groupCollection.findOne({"_id": groupId}).users;

        return users;
    }
});

// Creating helpers for the group type:
Template.groupTypesT.helpers({
    specGroupType(){
        let groupId = localStorage.getItem("groupId");
        let category = groupCollection.findOne({"_id": groupId}).category;
         // Change colour of the group type category when you click on it
        let groupTypes = {"work" : 0, "travel" : 0, "friends" : 0, "other" : 0};

        // Sets
        groupTypes[category] = 1;

        // New array
        let allGroups = [];

        // Adds each group to array
        for(g in groupTypes){
            let className = '';

            // If the group is the one selected, add class
            if(groupTypes[g]){
                className = 'selectedGroup';
            }

            // Creates group object
            let group = {'name' : g, 'class' : className};

            // Pushes object into array
            allGroups.push(group)
        }

        return allGroups
    }
});

// Reroute function to 404 page. 
Template.rr2nf_02.onRendered(function(){
    FlowRouter.go("notFound");
});

// EVENTS: 
Template.manageGroup.events({
    // Upon submitting a new message, message is displayed in the message list:
    'click #button_add_message' : function (e) {
        let customMessage = document.getElementById("input_add_message").value;
        let groupId = localStorage.getItem("groupId");
        check(customMessage, String);
        Meteor.call('customMessages.insert', customMessage, groupId);
        document.getElementById("input_add_message").value = '';
    },  
    // Delete a custom message
    'click .message_x_button' : function (e) {
        let id = e.target.parentNode.getAttribute("id");
        Meteor.call('customMessages.delete', id);
    },
    // Select a group type which will affect the predefined message list displayed
    'click .group_type' : function (e) {
        let groupType = e.target.getAttribute("id");
        let groupId = localStorage.getItem("groupId");
        Meteor.call('group.category', groupId, groupType);
    },
    // Reroute to group page upon clicking the "back" div:
    'click #goBack' : function (e) {
        FlowRouter.go('group');
    },
    // adding members to group list:
    'click #button_add_member' : function (e) {
        let userName = document.getElementById("input_add_member").value;
        let groupId = localStorage.getItem("groupId");
        Meteor.call('user.add', userName, groupId);
        document.getElementById("input_add_member").value = '';
    },
});