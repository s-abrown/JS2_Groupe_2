// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
Meteor.subscribe("messages");
Meteor.methods({
  sendMessage: function (messageText) {
    /* add authentication here */

    Messages.insert({
      messageText: messageText,
      createdAt: new Date(),
      username: "anonymous"
    });
  }
});
Template.body.helpers({
  recentMessages: function () {
    return Messages.find({}, {sort: {createdAt: 1}});
  },
  /* unread message helper */
});