// THIS IS WHERE U IMPORT UR STUFF //


// import templating in general
import { Template } from 'meteor/templating'
// importing the table "tasks"
import { TasksCollection } from '/imports/db/TasksCollection';// import the templates that we create in App.html
// AND import the html structure.
import './App.html';
// Import the Task.js template
import './Task.js';
// Import the Login template
import "./Login.js";
 




// See the App.html file where we created a template called "template name="MainContainer".

/* Creating a hardcoded list of tasks
Template.mainContainer.helpers({
  tasks: [
    { text: 'This is task 1' },
    { text: 'This is task 2' },
    { text: 'This is task 3' },
  ],
});
*/

// Const for authenticator
const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

// For the task subscription:
const IS_LOADING_STRING = "isLoading";

Template.mainContainer.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();

  const handler = Meteor.subscribe('tasks');
  Tracker.autorun(() => {
    this.state.set(IS_LOADING_STRING, !handler.ready());
  });
});

// Once we don't need the placeholder and want to access the database properly:
Template.mainContainer.helpers({
  tasks() {
    // parse through the collection to return xyz data
    return TasksCollection.find({}, { sort: { createdAt: -1 } });
  },
  isUserLogged() {
    return isUserLogged();
  },
  getUser(){
      return getUser();
  },
  isLoading() {
    const instance = Template.instance();
    return instance.state.get(IS_LOADING_STRING);
  }
});

Template.mainContainer.events({
    'click .user'(){
        Meteor.logout();
    },
});

// Submit Listener
Template.form.events({
  "submit .task-form"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    // AKA Updating the collection
    Meteor.call('tasks.insert', text);

    // Clear form
    target.text.value = '';
  }
});