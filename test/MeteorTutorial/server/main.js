import { Meteor } from 'meteor/meteor';

// Import accounts after running the command line 
import { Accounts } from 'meteor/accounts-base';

// Import the table "TasksCollection" that we created in /api/tasksCollection.js
import { TasksCollection } from '/imports/db/TasksCollection';

// Import the methods from imports/api/taskMethods
import '/imports/api/tasksMethods.js';

// Import the publications
import '/imports/api/tasksPublications';


// function
const insertTask = taskText => TasksCollection.insert({ text: taskText });
 
// In other words:
/* 
function insertTask(taskText){
  TasksCollection.insert(text: taskText)
}
 */


// constants for account
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  // For accounts
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  };
  // For task list
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});