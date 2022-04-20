import { Meteor } from 'meteor/meteor';
import { predefinedMessages } from '../imports/db/collections';
import '/imports/db/collections.js'
 
Meteor.startup(() => {
  predefinedMessages.find()
});