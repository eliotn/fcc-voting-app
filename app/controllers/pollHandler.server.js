'use strict';

var Poll = require('../models/polls.js');
var Users = require('../models/users.js');
function PollHandler () {
    var pollsclicked = 0;
    //Polls.find(owner.github.id, );
    this.getPolls = function(req, res) {
        /*Polls.find().exec(function(err, result) {
            if (err) { throw err; }
            res.json({"test": result});
            return;
        });*/
        
        //jsons["HI"] = "Hello" + pollsclicked;
        Poll.find({}, function (err, polls) {
            var jsons = {};
            if (err) {
                jsons["error"] = err.toString();
                return;
            }
            var i = 0;
            polls.forEach(function(poll) {
                var owner = poll.owner.toString();
                console.log("Adding " + owner + " for poll " + i);
                var polljson = {"question": poll.question};
                if (!jsons.hasOwnProperty(owner)) {
                    jsons[owner] = [];
                }
                jsons[owner].push(polljson);
                i += 1;
            });
            res.json(jsons);
        })
        
    };
    this.addPoll = function(req, res) {
        var poll = new Poll({"owner":req.user.github.id, "question":"Are you ready 2?", "choices":[]});
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