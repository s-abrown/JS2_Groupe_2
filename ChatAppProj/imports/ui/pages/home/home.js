import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './home.html';

// Logging in:
Template.home.events({
    'click #button'(e) {
        let username = document.getElementById("userID").value;
        let password = document.getElementById("password").value;

        Meteor.loginWithPassword(username, password, function(err, res){
            if (err) {
                Swal.fire(
                    'Error!',
                    err.message,
                    'error'
                  )
            } else {
                FlowRouter.go("menu")
            }
        });
    }
});

Template.rerouteToMenu.onRendered(function(){
    FlowRouter.go("menu");
});