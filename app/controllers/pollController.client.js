'use strict';

(function() {
    
    var newPollButton = document.querySelector('.poll-add');
    var deletePollButton = document.querySelector('.poll-delete');
    var showPolls = document.querySelector('#poll-display');
    var addPollUrl = appUrl + '/api/addPoll/';
    var allPollsUrl = appUrl + '/api/allPolls/';
    
    function updatePolls(data) {
      //winston.log(require('winston').info("UPDATING POLLS"));
      //var pollObject = JSON.parse(data);
      //console.log(pollObject);
      //TODO: add display code
      //var resultHtml = "<table><th><td>Owner</td><td>Question</td></th>"
      //for (var v in pollObject) {
      //  for (var i = 0; i < pollObject[v].length; i++) {
      //    resultHtml = resultHtml + "<tr><td>" + v + "</td><td>" + pollObject[v][i].question + "</td></tr>";
      //  }
      //}
      //resultHtml = resultHtml + "</table>";
      showPolls.innerHtml = "HELLO";
    }
    showPolls.innerHtml = "HELLO WORLD";
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', allPollsUrl, updatePolls));
    if (newPollButton !== null) {
       newPollButton.addEventListener('click', function () {
        
        ajaxFunctions.ajaxRequest('POST', addPollUrl, function () {
           ajaxFunctions.ajaxRequest('GET', allPollsUrl, updatePolls);
        });

      }, false);
    }
})();