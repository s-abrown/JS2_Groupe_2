import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {createdAt: -1}, limit: 5});
  });
});

Messages = new Mongo.Collection("msgs");