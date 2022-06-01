import { check } from 'meteor/check';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';

import './signUp.html';

//--------//
// HELPERS
//--------//

// None

//--------//
// EVENTS
//--------//

Template.signUp.events({
    // Clicks sign up button
    'click #button' : function (e){
        // Gets inputs' values
        let username = document.getElementById("userID").value;
        let password = document.getElementById("password").value;

        // Checks types 
        check(username, String);
        check(password, String);

        // Craetes new user server side
        Meteor.call('user.create', username, password, function(err, res) {
            // If there is an error (hopefully not), displays a pretty alert
            if(err) {
                Swal.fire(
                    'Error!',
                    err.message,
                    'error'
                  )
            }
            // Redirects to home
            else {
                FlowRouter.go("home");
            }
        });
    },
});