'use strict'

angular.module('myApp')
  .service('GetAnswers', function($http) {

    this.getAnswersByQuestion = function(question) {
      // Send get req to DB, use params
      return $http({
        method: 'GET',
        url: '/api/getAnswers/' + question,
        params: ({questionID: question})
      })

    };

  });

