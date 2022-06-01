import { check } from 'meteor/check';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { customMessagesCollection, groupCollection } from '/imports/db/collections';

import './manageGroup.html';

// Subscription to custom messages
if (Meteor.isClient){
    Meteor.subscribe('customMessages');
}

//--------//
// HELPERS
//--------//

// Manage group
Template.manageGroup.helpers({
    // Custom messages
    customMessages(){
        // Gets group id
        let groupId = localStorage.getItem("groupId");
        // Returns custom messages for specific group
        return customMessagesCollection.find({group: groupId}).fetch();
    },
    // Members
    getUsers(){
        // Gets group id
        let groupId = localStorage.getItem("groupId");
        // Gets all users from specific group
        let users = groupCollection.findOne({"_id": groupId}).users;
        // Returns users
        return users;
    }
});

// Group type
Template.groupTypesT.helpers({
    specGroupType(){
        // Gets group id
        let groupId = localStorage.getItem("groupId");
        // Gets group category
        let category = groupCollection.findOne({"_id": groupId}).category;
        // Defines group types 
        let groupTypes = {"work" : 0, "travel" : 0, "friends" : 0, "other" : 0};

        // Sets current group type value to 1
        groupTypes[category] = 1;

        let allGroups = [];

        // Adds each group to array
        for(g in groupTypes){
            // If the group is the one selected, add class
            let className = '';

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

//--------//
// EVENTS
//--------//

Template.manageGroup.events({
    // Adds new (custom) message
    'click #button_add_message' : function (e) {
        // Gets new message's text
        let customMessage = document.getElementById("input_add_message").value;
        // Gets group id
        let groupId = localStorage.getItem("groupId");

        // Checks types
        check(customMessage, String);

        // Inserts new message server side
        Meteor.call('customMessages.insert', customMessage, groupId);

        // Empties input
        document.getElementById("input_add_message").value = '';
    },  
    // Deletes (custom) message
    'click .message_x_button' : function (e) {
        // Gets message id
        let id = e.target.parentNode.getAttribute("id");

        // Deletes message server side
        Meteor.call('customMessages.delete', id);
    },
    // Selects group type
    'click .group_type' : function (e) {
        // Gets group type
        let groupType = e.target.getAttribute("id");
        // Gets group id
        let groupId = localStorage.getItem("groupId");

        // Sets new group type server side
        Meteor.call('group.category', groupId, groupType);
    },
    // Back to menu
    'click #goBack' : function (e) {
        FlowRouter.go('group');
    },
    // Adds member
    'click #button_add_member' : function (e) {
        // Gets input text (= user's name)
        let userName = document.getElementById("input_add_member").value;
        // Gets group id
        let groupId = localStorage.getItem("groupId");

        // Adds member server side
        Meteor.call('user.add', userName, groupId);

        // Empties input
        document.getElementById("input_add_member").value = '';
    },
});

// Reroutes to 404 page
Template.rr2nf_02.onRendered(function(){
    FlowRouter.go("notFound");
});