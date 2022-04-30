import { Mongo } from 'meteor/mongo';

// This collection is for predefined messages
export const predefinedMessagesCollection = new Mongo.Collection('predefinedMessages');

// This collection is for sent messages
export const sentMessagesCollection = new Mongo.Collection('sentMessages');

// This collection is for the groups
export const groupCollection = new Mongo.Collection('group');

// This collection is for the personalised messages:
export const customMessagesCollection = new Mongo.Collection('customMessages');