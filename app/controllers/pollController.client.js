'use strict';

(function () {
    var newPollQuestion = document.querySelector('#poll-question');
    var newPollButton = document.querySelector('.poll-add');
    var deletePollButton = document.querySelector('.poll-delete');
    var showPolls = document.querySelector('#poll-display');
    var addPollUrl = appUrl + '/api/addPoll';
    var seePollUrl = appUrl + '/api/polls/:id/';
    var allPollsUrl = appUrl + '/api/polls';
    var deletePollUrl = appUrl + '/api/deletePoll'
    function updatePolls(data) {
      
      var pollObject = JSON.parse(data);
      console.log(pollObject);
      //TODO: add display code
      var resultHtml = "<table><tr><td>Owner</td><td>Question</td></tr>"
      for (var v in pollObject) {
        for (var i = 0; i < pollObject[v].length; i++) {
          resultHtml = resultHtml + "<tr><td>" + v + "</td><td>" + pollObject[v][i].question + "</td></tr>";
        }
      }
      resultHtml = resultHtml + "</table>";
      showPolls.innerHTML = resultHtml;
      console.log("Update polls called")
    }
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', allPollsUrl, updatePolls));
    if (newPollButton !== null) {
      newPollButton.addEventListener('click', function () {
        var postTo = addPollUrl;
        ajaxFunctions.postData( addPollUrl, {'question': newPollQuestion.textContent}, function () {
           ajaxFunctions.ajaxRequest('GET', allPollsUrl, updatePolls);
        });

      }, false);
    }
})();