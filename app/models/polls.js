'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    owner: String,
    id: String,
    question: {type: String, default: "What should my question be?"},
    choices: [{name:String, votes:Number}],
    creationtime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poll', Poll);