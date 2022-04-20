import { Template } from 'meteor/templating';
import { predefinedMessagesCollection } from '/imports/db/collections';
import './group.html';

Template.group.helpers({
    // predefinedMessages: [
    //     { "_id" : "ff83m7apthjJovN8L", "message" : "Hello", "category" : 0 },
    //     { "_id" : "bZTFnG8QSjvnHkPwu", "message" : "Bye", "category" : 1 },
    //     { "_id" : "vZoE63H43KRQkLitG", "message" : "Call me", "category" : 1 },
    // ]

    predefinedMessages(){
        return predefinedMessagesCollection.find({});
    },
})