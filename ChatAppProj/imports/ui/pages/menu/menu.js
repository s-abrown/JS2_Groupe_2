import { check } from 'meteor/check';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { groupCollection } from '/imports/db/collections';

import './menu.html';

// Subscribe the client to the collection for predefined messages to allow them to view messages: 
if (Meteor.isClient){
    Meteor.subscribe('publishGroups');
}

// HELPER to feed data to the group template: 
Template.allGroups.helpers({
    group(){
        // To return the group members in a group:
        return groupCollection.find({"users._id": Meteor.userId()}).fetch();
    },
});

//  HELPER to feed in the logged in user name and log out option
Template.displayUsername.helpers({
    username(){
        return Meteor.users.findOne({'_id' : Meteor.userId()}).username;
    }
})

// EVENT: upon clicking on + div, a new group is created: 
Template.menu.events({
    'click #newGroup' : function (e){
        Meteor.call("group.createGroup", Meteor.userId());
    },
    'click .groups' : function (e){
        let id = e.target.getAttribute("id");
        localStorage.setItem("groupId", id);
        FlowRouter.go("group")
    },
    // Redirect to home page upon clicking the logout div
    'click #logout' : function(e){
        Meteor.logout(function(e){
            if(!e){
                FlowRouter.go("home")
            }
        });
    }
});

// Reroute to page 404 if not logged in: 
Template.rr2nf_03.onRendered(function(){
    FlowRouter.go("notFound");
});

