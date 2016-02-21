'use strict'

angular.module('myApp')
  .service('GoToQuestion', ['$http', '$state', function($http, $state) {

    this.grabQuestion = function(questID) {
        console.log("Getting question ", questID);
        // Query DB for question, send questionid as param (cookies don't mix well with routes)
        return $http.get('/api/questions/' + questID)
        .success(function(resp, status) {
            // Send question back to controller
            console.log("Here's the question from grab question", resp.singleQuestion[0]);
            return resp;
        })
    }


  }]);

