'use strict';

var Poll = require('../models/polls.js');
var Users = require('../models/users.js');
function PollHandler () {
    var pollsclicked = 0;
    //Polls.find(owner.github.id, );
    this.getPolls = function(req, res) {
        Poll.find({}, function (err, polls) {
            var jsons = {};
            if (err) {
                jsons["error"] = err.toString();
                res.json(jsons);
                return;
            }
            var i = 0;
            polls.forEach(function(poll) {
                var owner = poll.owner.toString();
                
                var polljson = {"question": poll.question, "id": poll.id};
                if (!jsons.hasOwnProperty(owner)) {
                    jsons[owner] = [];
                }
                jsons[owner].push(polljson);
                i += 1;
            });
            res.json(jsons);
        });
        
    };
    this.getPoll = function(req, res) {
        Poll.find({"id": req.id}, function (err, polls) {
            if (err) {
                res.json({"error":err.toString()});
                return;
            }
            polls.forEach(function(poll) {
                res.json(poll);
                return;
            });
        });
    }
    this.addPoll = function(req, res) {
        console.dir(req.body);
        var poll = new Poll({"owner":req.user.github.id, "question":req.body.question, "choices":[]});
        poll.save(function(err) {
            if (err) {console.error(err); }
            
            return;
        });
        res.json({"poll":"added"});
    };
    this.removePoll = function(req, res) {
        res.json({});
    }
}

module.exports = PollHandler;