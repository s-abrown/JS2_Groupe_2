import "./test.html";
import { Test } from '/server'


Test = new Mongo.Collection("test");
Test.insert({_id: "test one"});
//line to query
const _test = Test.findOne({_id : "test one"});
console.log(test);