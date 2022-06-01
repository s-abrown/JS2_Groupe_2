import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './home.html';

//--------//
// HELPERS
//--------//

// None

//--------//
// EVENTS
//--------//
Template.home.events({
    'click #button'(e) {
        // Gets values
        let username = document.getElementById("userID").value;
        let password = document.getElementById("password").value;

        // Feedback alert 
        Meteor.loginWithPassword(username, password, function(err, res){
            // If there is an error (hopefully not), displays a pretty alert
            if (err) {
                Swal.fire(
                    'Error!',
                    err.message,
                    'error'
                  )
            } 
            // Redirects to menu
            else {
                FlowRouter.go("menu")
            }
        });
    }
});

// Rerouts to menu if alread logged 
Template.rerouteToMenu.onRendered(function(){
    FlowRouter.go("menu");
});