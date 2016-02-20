'use strict'

angular.module('myApp')
  .service('GetQuestions', function($http) {

    this.getQuestions = function() {

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
          //MJ: We'll need some way of identifying each one so we know which one was clicked on, besides the primary key.
            //Creating a randomized public id makes sense for this. I don't see a need to make a new random key every time
            //we send the questions through the server, though

        // KK: Need to create a preview of each question
    };

    //MJ: With services (unlike factories), we don't have to return anything (like below) because they assume psuedoclassical instantiation
    // return {
    // 	getQuestions: getQuestions
    // };

  });

