import './signUp.html';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

Template.signUp.events({
    'click #button' : function (e){
        let username = document.getElementById("userID").value;
        let password = document.getElementById("password").value;


        let r = Meteor.call('user.create', username, password);
        console.log(r)
        //let user = Meteor.users.findOne({'_id' : Meteor.userId()}).username;
    },
});

// Create helpers for the page

// Create events/listeners eg. eg. upon sumbmitting a new username/id/password password for a click