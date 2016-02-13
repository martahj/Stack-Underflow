'use strict'

angular.module('myApp')
  .controller('QuestionCtrl', [ '$scope', 'GoToQuestion', 'GetQuestionDetail', 'GetAnswers'
  	                             function( $scope, GoToQuestion, GetQuestionDetail, GetAnswers) {

    //This must match the limitations in the database
    $scope.maxAnswerLength = 1000;

    //This will start out as empty and get filled out as the user completes the form
    $scope.userInput = undefined;

    //This is a placeholder for the question whose page this is. Eventually, we'll get this from the server
  	$scope.question = {
  		                title: 'Question Title', 
  	                    text: 'Question Text!',
  	                    user: 'User1',
  	                    time: 'timestamp'
  	                  };

  	//This is a placeholder for the answers, which we'll eventually get from the server
    $scope.answers = [{user: 'user1', text: 'answer text', time: 'timestamp'}, 
                      {user: 'user2', text: 'answer text', time: 'timestamp'}];

    $scope.init = function() {

    	//The point of this is to bring the question into the QuestionCtrl
    	//However, I have no idea if this will work
    	var questionForGet = GoToQuestion.grabQuestion();

    	GetQuestionDetail.getQuestionDetail(questionForQet)
    	  .then( function(data) {
    	  	$scope.question = data;
    	  	return;
    	  })
    	  .then( function() {

    	  })

    	//send get request to server for the full question info and for answers
    }
    $scope.init();

  }]);

