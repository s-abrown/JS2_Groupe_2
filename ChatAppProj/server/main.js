import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Test = new Mongo.Collection('test')
//commenting line below for a test
//Test.insert({'test' : 'test'})


Test.insert({_id: "test one"});
//this line to return something
const _test = Test.ffindOne({_id: "test one"});
//check
console.log(_test)

/* const insertTask = taskText => Test.insert({ text: taskText });
 
Meteor.startup(() => {
  if (Test.find().count() === 0) {
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
}); */