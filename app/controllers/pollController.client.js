'use strict';

(function() {
    
    var newPollButton = document.querySelector('.poll-add');
    var deletePollButton = document.querySelector('.poll-delete');
    var showPolls = document.querySelector('#poll-display');
    var apiUrl = appUrl + '/api/pollsBy/:id';
    var allPollsUrl = appUrl + '/api/allPolls';
    
    function updatePolls(data) {
      //winston.log(require('winston').info("UPDATING POLLS"));
      var pollObject = JSON.parse(data);
      //TODO: add display code
      showPolls.innerHTML = "<p>" + JSON.stringify(pollObject) + "HELLO WORLD</p>";
    }
    //winston.log(require('winston').info("UPDATING POLLS"));
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', allPollsUrl, updatePolls));
   
    
})();