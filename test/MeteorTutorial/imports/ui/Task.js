import { Template } from 'meteor/templating';

import { TasksCollection } from "../db/TasksCollection";

import './Task.html';


// checkmark event
Template.task.events({
  'click .toggle-checked'() {
    /* // Set the checked property to the opposite of its current value
    TasksCollection.update(this._id, {
      $set: { isChecked: !this.isChecked },
    }); */
    Meteor.call("tasks.setIsChecked", this._id, !this.isChecked)
  },
  'click .delete' () {
      // "this" refers to an individual task object.
      // "In a collection every inserted document has a unique _id of the current task with this._id"
      // Once we have the _id we can use/update/remove relevant tasks.
      //TasksCollection.remove(this._id); // insecure way

    Meteor.call("tasks.remove", this._id);

  }
});