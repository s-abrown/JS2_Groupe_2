import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './notFound.html'

// no relevant collection not relevant subscriptions no relevant helpers for this page. 

// Event:
Template.notFound.events({
    //sends you back to the home page upon clicking the "back" div
    'click .text' :
    function (e) {
        FlowRouter.go('home');
    }
})