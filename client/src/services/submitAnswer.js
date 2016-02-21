'use strict'

angular.module('myApp')
  .service('SubmitAnswer', function($http) {

    var Answer = function(text) {
        return {
            user: "placeholder", //can we get this from a global variable? Need to figure out how to keep track of user
            text: text
        };
    };

    // Prepare data to send to api to insert into DB
    this.submitA= function(text, id) {
        // need to get user info, as well
        var newA = new Answer(text);
        console.log("Now getting an answer", newA.text);
        var timestamp = (Date.now());
        var currentDate = new Date(timestamp);
        var data = {text: newA, id: id, time: currentDate};
        $http.post('/api/answer', data);
    };

  });

