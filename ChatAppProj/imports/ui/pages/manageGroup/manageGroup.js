import { check } from 'meteor/check';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { customMessagesCollection, groupCollection } from '/imports/db/collections';

import './manageGroup.html';

// Custom messages subscription:
if (Meteor.isClient){
    Meteor.subscribe('customMessages');
}

// Creating helpers for custom messages and for group users:
Template.manageGroup.helpers({
    // For custom messages
    customMessages(){
        let groupId = localStorage.getItem("groupId");
        return customMessagesCollection.find({group: groupId}).fetch();
    },
    // For upadting the users in the group member list
    getUsers(){
        let groupId = localStorage.getItem("groupId");
        let table = Meteor.call('membersDisplay', groupId, (e,r) => {
            return r;
        });
        console.log('This is:' + table)
        return table
    },
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
})

// Reroute function to 404 page. 
Template.rr2nf_02.onRendered(function(){
    FlowRouter.go("notFound");
});

// Listener/event: 
Template.manageGroup.events({
    // Upon submitting a new message it is displayed in the message list
    'click #button_add_message' : function (e) {
        let customMessage = document.getElementById("input_add_message").value;
        let groupId = localStorage.getItem("groupId");
        
        check(customMessage, String);

        document.getElementById("input_add_message").value = '';
        
        Meteor.call('customMessages.insert', customMessage, groupId);
    },  
    // Deletes a custom message
    'click .message_x_button' : function (e) {
        let id = e.target.parentNode.getAttribute("id");
        Meteor.call('customMessages.delete', id);
    },
    // Deletes a member from the member list
    'click .member_x_button' : function (e) {
        let id = e.target.parentNode.getAttribute("id");
        Meteor.call('users.delete', id);
    },
    // Select a group type which will affect the predefined message list displayed
    'click .group_type' : function (e) {
        let groupType = e.target.getAttribute("id");
        let groupId = localStorage.getItem("groupId");
        //Meteor.call('group.category', groupId, groupType)
        Meteor.call('group.category', groupId, groupType);
    },
    'click #goBack' : function (e) {
        FlowRouter.go('group');
    },
    // adding members to group list 
    'click #button_add_member' : function (e) {
        let userName = document.getElementById("input_add_member").value;
        let groupId = localStorage.getItem("groupId");
        //Meteor.call('group.category', groupId, groupType)
        Meteor.call('user.add', userName, groupId);
    },
});

