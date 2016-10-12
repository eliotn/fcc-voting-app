'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');
module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();
	
	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.put(isLoggedIn, clickHandler.addClick)
		.post(isLoggedIn, clickHandler.removeClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
	
	app.route('/api/allPolls').get(pollHandler.getPolls);
	
	//see all polls
	//app.route('/api/polls/')
	//	.get(pollHandler.getPolls);
	
	//see specific poll
	//app.route('/api/polls/view/:pollid')
	//	.get(pollHandler.getPoll)
	
	//vote on a poll
	//app.route('/api/polls/view/:pollid/vote/:votenum')
	// .post(*)
	
	//polls by user
	//post a poll, delete a poll, view a poll
	//if not logged in displays different page
	app.route('/api/pollsBy/:id')
		.post(isLoggedIn, pollHandler.addPoll)
		.delete(isLoggedIn, pollHandler.removePoll);
		
	//modify a poll
	//app.route('/api/modifyPollBy/:id/poll/:poll')
};
