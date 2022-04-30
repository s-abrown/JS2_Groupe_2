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
        return groupCollection.find({}).fetch();
    },
});

// event to reroute to page 404 if not logged in
Template.rr2nf_03.onRendered(function(){
    FlowRouter.go("notFound");
});

// Listener/ event: upon clicking on + a new group is created. 
Template.menu.events({
    'click #newGroup' : function (e){
        let user = Meteor.users.findOne({'_id' : Meteor.userId()})._id;
        Meteor.call("group.createGroup", user);
    },
    'click .groups' : function (e){
        let id = e.target.getAttribute("id");

        // Storing group id for reuse elsewhere
        // Session.set("groupId", id); // Needs security checks

        localStorage.setItem("groupId", id);
        FlowRouter.go("group")
    }
});
