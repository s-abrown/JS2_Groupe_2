import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';

import './signUp.html';

//EVENT: 
Template.signUp.events({
    'click #button' : function (e){
        let username = document.getElementById("userID").value;
        let password = document.getElementById("password").value;
        // Checks to make sure usernames and passwords are strings: 
        check(username, String);
        check(password, String);

        Meteor.call('user.create', username, password, function(err, res) {
            if(err) {
                Swal.fire(
                    'Error!',
                    err.message,
                    'error'
                  )
            } else if (res) {
                FlowRouter.go("home");
            }
        });
    },
});