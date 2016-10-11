'use strict';

var Polls = require('../models/polls.js');
var Users = require('../models/users.js');

function PollHandler () {
    //Polls.find(owner.github.id, );
    this.getPolls = function(req, res) {
        res.json({"HI": "Hello"});
    };
    this.addPoll = function(req, res) {
        res.json({});
    };
    this.removePoll = function(req, res) {
        res.json({});
    }
}

module.exports = PollHandler;