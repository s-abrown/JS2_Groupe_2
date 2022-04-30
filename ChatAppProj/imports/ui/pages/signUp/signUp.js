import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

import './signUp.html';

Template.signUp.events({
    'click #button' : function (e){
        let username = document.getElementById("userID").value;
        let password = document.getElementById("password").value;
        check(username, String);
        check(password, String);

        let r = Meteor.call('user.create', username, password);
        console.log(r);
    },
});