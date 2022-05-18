import { check } from 'meteor/check';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { groupCollection } from '/imports/db/collections';

import './menu.html';

// Subscribe the client to the collection for predefined messages
if (Meteor.isClient){
    Meteor.subscribe('publishGroups');
}

// Creating the helper to feed data to the group template
Template.allGroups.helpers({
    group(){
        let user = Meteor.users.findOne({'_id' : Meteor.userId()})._id;
        return groupCollection.find({"users":{$in:[user]}}).fetch();
    },
});
// Helper to feed in the logged in user name and log out option
Template.displayUsername.helpers({
    username(){
        return Meteor.users.findOne({'_id' : Meteor.userId()}).username;
    }
})

// Event: upon clicking on + a new group is created. 
Template.menu.events({
    'click #newGroup' : function (e){
        let user = Meteor.users.findOne({'_id' : Meteor.userId()})._id;
        check(user, String);
        Meteor.call("group.createGroup", user);
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

// Reroute to page 404 if not logged in
Template.rr2nf_03.onRendered(function(){
    FlowRouter.go("notFound");
});

