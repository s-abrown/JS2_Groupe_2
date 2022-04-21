import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './home.html';

// Code for logging in
Template.home.events({
    'click #button'(e) {
        let username = document.getElementById("userID").value;
        let password = document.getElementById("password").value;

        Meteor.loginWithPassword(username, password);
    }
});

// Code for logging out
Template.dashboard.events({
    'click .logout' : function(event){
        event.preventDefault();
        Meteor.logout();
    }
})