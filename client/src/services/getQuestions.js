'use strict'

angular.module('myApp')
  .service('GetQuestions', function($http) {

    var getQuestions = function() {
        console.log("in getQuestions")
    	return $http({
    		method: 'GET',
    		url: '/api/questions'
    	})


        //GET request to server

        //Returns an array of questions, newest first
        //For each question, need to get {publicQuestionID: __, title: __, preview: ___}
        //  -preview is the first 2 lines of the question text
        //This should be made compatable with the infinite scroll function

        // KK: Do we want to create a possibly randomized publicQuestionID for each question?
        // KK: Need to create a preview of each question
    };
    return {
    	getQuestions: getQuestions
    };

  });

