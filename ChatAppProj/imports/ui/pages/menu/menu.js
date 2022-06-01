import { check } from 'meteor/check';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { groupCollection } from '/imports/db/collections';

import './menu.html';

// Subscribes to groups 
if (Meteor.isClient){
    Meteor.subscribe('publishGroups');
}

//--------//
// HELPERS
//--------//

// Displays all groups
Template.allGroups.helpers({
    group(){
        // Returns groups in which the user is
        return groupCollection.find({"users._id": Meteor.userId()}).fetch();
    },
});

// Displays username
Template.displayUsername.helpers({
    username(){
        // Returns username from db
        return Meteor.users.findOne({'_id' : Meteor.userId()}).username;
    }
});

//--------//
// EVENTS
//--------//

Template.menu.events({
    // Creates new group
    'click #newGroup' : function (e){
        Meteor.call("group.createGroup", Meteor.userId());
    },
    // Redirects to clicked group
    'click .groups' : function (e){
        // Gets group id
        let id = e.target.getAttribute("id");
        // Sets group id
        localStorage.setItem("groupId", id);
        // Reroutes
        FlowRouter.go("group")
    },
    // Logs out
    'click #logout' : function(e){
        // Logs out
        Meteor.logout(function(e){
            // If no error (hopefully) redirects to home
            if(!e){
                FlowRouter.go("home")
            }
        });
    }
});

// Reroutes to 404 page
Template.rr2nf_03.onRendered(function(){
    FlowRouter.go("notFound");
});

