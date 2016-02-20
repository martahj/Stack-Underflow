'use strict'

angular.module('myApp')
  .service('GetQuestions', function($http) {

    var getQuestions = function() {
        console.log("in qssfdasfdas")
    	return $http({
    		method: 'GET',
    		url: '/api/questions'
    	})


        //GET request to server

        //Returns an array of questions, newest first
        //For each question, need to get {publicQuestionID: __, title: __, preview: ___}
        //  -preview is the first 2 lines of the question text
        //This should be made compatable with the infinite scroll function
    };
    return {
    	getQuestions: getQuestions
    };

  });

