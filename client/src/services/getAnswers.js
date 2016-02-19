'use strict'

angular.module('myApp')
  .service('GetAnswers', function($http) {

    this.getAnswersByQuestion = function(questionId) {
    	//GET request to server for answers to question with questionId
    	return $http({
    		method: 'GET',
    		url: '/getAnswers/' + questionId
    	});

        //Return array of answers in format: 
          // {user: __, text: __, timestamp: __}
    };

  });

