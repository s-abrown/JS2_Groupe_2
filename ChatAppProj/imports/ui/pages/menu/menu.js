import './menu.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'

import { groupCollection } from '/imports/db/collections';

// Subscribe the client to the collection for predefined messages
if (Meteor.isClient){
    Meteor.subscribe('publishGroups');
}

// Creating the helper to feed data to the group template
Template.allGroups.helpers({
    group(){
        return groupCollection.find({}).fetch({});
    },
});

// Listener/ event: upon clicking on a message it gets sent and is displayed onscreen. 
Template.menu.events({
    'click #newGroup' : function (e){
        Meteor.call("group.createGroup");
    },
});