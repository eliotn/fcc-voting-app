'use strict';

var Polls = require('../models/polls.js');
var Users = require('../models/users.js');

function PollHandler () {
    //Polls.find(owner.github.id, );
    this.getPolls = function(req, res) {
        /*Polls.find().exec(function(err, result) {
            if (err) { throw err; }
            res.json({"test": result});
            return;
        });*/
        res.json({"HI": "Hello"});
    };
    this.addPoll = function(req, res) {
        var poll = new Poll({"owner":req.user.github.id, "question":"Are you ready?", "choices":[]});
        poll.save(function(err) {
            if (err) {throw err; }
            res.json({});
            return;
        });
    };
    this.removePoll = function(req, res) {
        res.json({});
    }
}

module.exports = PollHandler;