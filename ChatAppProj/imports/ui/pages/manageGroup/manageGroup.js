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

// Creating helpers:
Template.manageGroup.helpers({
    // For custom messages
    customMessages(){
        let groupId = localStorage.getItem("groupId");
        return customMessagesCollection.find({group: groupId}).fetch();
    },
    // For the member list??
    users(){
        return users.find({}).fetch({});
    },
});

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
    // Upon adding a new member to a group, the member is displayed in the member list
    'click #member_list' : function (e) {
        let memberList = document.getElementById("input_add_member").value;
        // let memberId = localStorage.getItem("memberId");
        document.getElementById("input_add_member").value = '';
        Meteor.call('users.insert', memberList, memberId);
    },
    // Deletes a member from the member list
    'click .member_x_button' : function (e) {
        let id = e.target.parentNode.getAttribute("id");
        Meteor.call('users.delete', id);
    },
    // Select a group type which will affect the predefined message list?
    'click .group_type' : function (e) {
        let groupType = e.target.getAttribute("id");
        let groupId = localStorage.getItem("groupId");
        //Meteor.call('group.category', groupId, groupType)
        Meteor.call('group.category', groupId, groupType);
    },
    'click #goBack' : function (e) {
        FlowRouter.go('group');
    }
});

