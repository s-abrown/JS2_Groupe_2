import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './home.html';

// Code for logging in
Template.home.events({
    'click #button'(e) {
        let username = document.getElementById("userID").value;
        let password = document.getElementById("password").value;

        Meteor.loginWithPassword(username, password);

        if(Meteor.userId){
            FlowRouter.go("menu")
        }
    }
});

Template.rerouteToMenu.onRendered(function(){
    FlowRouter.go("menu");
});