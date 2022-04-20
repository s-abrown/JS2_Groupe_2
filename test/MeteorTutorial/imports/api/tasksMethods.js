import { check } from 'meteor/check';
import { TasksCollection } from '/imports/db/TasksCollection';

// Below: the method for the task list. 
// Using the "check" package to make sur we're receviing the expected types of input.
// "it is important to make sure you know exactly what you are inserting or updating in your database"
 
Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
 
    TasksCollection.insert({
      text,
      createdAt: new Date,
      userId: this.userId,
    })
  },
 
  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      }
    });
  }
});

// Once the method is done, we must make sure the server is registering it
// We do so by imporing this file to server/main.js