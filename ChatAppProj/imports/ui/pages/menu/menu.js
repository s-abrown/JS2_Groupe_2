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
        return groupCollection.find({}).fetch();
    },
});

// Listener/ event: upon clicking on + a new group is created. 
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
    }
});

// event to reroute to page 404 if not logged in
Template.rr2nf_03.onRendered(function(){
    FlowRouter.go("notFound");
});