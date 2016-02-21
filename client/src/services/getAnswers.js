'use strict'

angular.module('myApp')
  .service('GetAnswers', function($http) {

    this.getAnswersByQuestion = function(question) {
      console.log("In get Answers", question);
      return $http({
        method: 'GET',
        url: '/api/getAnswers/' + question.questionid,
        params: ({questionID: question.questionid})
      })
    };

  });

