'use strict'
//This is controller for the question page
//It corresponds to the view question.html
angular.module('myApp')
  .controller('QuestionCtrl', [ '$scope', 'GoToQuestion', 'GetQuestionDetail', 'GetAnswers', 'SubmitAnswer',
  	                             function( $scope, GoToQuestion, GetQuestionDetail, GetAnswers, SubmitAnswer) {
    //FOR ANSWERS:
    //This must match the limitations in the database... picked 1000 chars arbitrarily
    $scope.maxAnswerLength = 1000;
    //This will start out as empty and get filled out as the user writes an answer
    $scope.userInput = undefined;



    //TO SEE QUESTION AND PREVIOUS ANSWERS:
    //This is an object representing the question the user clicked on. It gets a value when the init function is run.
  	$scope.question = undefined;
    //This will by an array of all answer objects corresponding to $scope.question. It is populated when the init function is run.
  	$scope.answers = undefined;
    //These will each be formatted based on directives/answer.js

    //Function for submitting answer to database. References services.submitAnswer (which needs to be written)
    $scope.submitAnswer = SubmitAnswer.submitA;

    //INIT FUNCTION
    //The init function updates the page based on which question the user clicked on.

    //This version is a placeholder until we have the server up and running.
    $scope.initNoServer = function() {

      //Set $scope.question to stored question data
    	$scope.question = GoToQuestion.grabQuestion();

      //Set $scope.answers equal to some placeholder answers
      $scope.answers = [{user: 'user1', text: 'answer1 text', timestamp: 'timestamp'}, 
                        {user: 'user2', text: 'answer2 text', timestamp: 'timestamp'}];

    };

    //This will be the actual init function once we can get data from the server.
    $scope.init = function() {

      //get stored question id
      var questionId = GoToQuestion.grabQuestion();

      //refers to services/getQuestionDetail (NEED TO WRITE THIS)
      GetQuestionDetail.getQuestionDetail(questionId)
        .then( function(questionData) {
          $scope.question = questionData;
          return;
        })
        .then( function() {
          //refers to services/getAnswers (NEED TO WRITE THIS)
          return GetAnswers.getAnswersByQuestion(questionId)
        })
        .then (function(answersArray) {
          $scope.answers = answersArray;
          return;
        });
    }

    //Run the init function
    // $scope.initNoServer();
    $scope.init();

  }]);

