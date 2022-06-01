import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';

import './notFound.html'

//--------//
// HELPERS
//--------//

// None 

//--------//
// EVENTS
//--------//

Template.notFound.events({
    // Redirects to home
    'click .text' :
    function (e) {
        FlowRouter.go('home');
    }
});