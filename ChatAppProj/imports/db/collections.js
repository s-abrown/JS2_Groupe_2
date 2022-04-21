import { Mongo } from 'meteor/mongo';

// This collection is for predefined messages
export const predefinedMessagesCollection = new Mongo.Collection('predefinedMessages');

// This collection is for sent messages
export const sentMessagesCollection = new Mongo.Collection('sentMessages');

export const groupCollection = new Mongo.Collection('group');