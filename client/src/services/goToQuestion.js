'use strict'

angular.module('myApp')
  .service('GoToQuestion', ['$http', '$state', function($http, $state) {

    this.grabQuestion = function(questID) {
        // Query DB for question, send questionid as param (cookies don't mix well with routes)
        return $http.get('/api/questions/' + questID);
    }


  }]);

