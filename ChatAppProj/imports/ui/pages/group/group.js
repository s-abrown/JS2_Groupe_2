import './group.html';
import { Template } from 'meteor/templating';
import { predefinedMessages } from '/imports/db/collections.js';

Template.group.helpers({
    predefinedMessages(){
         return predefinedMessages.find({});
      }
})