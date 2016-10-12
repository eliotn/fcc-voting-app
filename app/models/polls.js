'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    owner: mongoose.Schema.Types.ObjectId,
    question: String,
    choices: [{name:String, votes:Number}]
});

module.exports = mongoose.model('Poll', Poll);