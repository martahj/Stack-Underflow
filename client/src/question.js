'use strict'
//This is controller for the question page
//It corresponds to the view question.html
angular.module('myApp')
  .controller('QuestionCtrl', [ '$scope', '$state', '$cookieStore', 'GoToQuestion', 'GetQuestionDetail', 'GetAnswers', 'SubmitAnswer',
  	                             function( $scope, $state, $cookieStore, GoToQuestion, GetQuestionDetail, GetAnswers, SubmitAnswer) {
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

    $scope.init = function() {
      // get the questionID out of the state params being passed in
      // var questid = $state.params.questionID;
      // console.log("Params??", questid);
      var cookieid = $cookieStore.get('qid');
      console.log("This should still be a cookie id", cookieid);


      // use promises to get data from http req
      GoToQuestion.grabQuestion(cookieid)
      .then(function(question) {
        return $scope.question = question.data.singleQuestion[0];
      })
      .then(function(data) {
        return GetAnswers.getAnswersByQuestion(data);
      })
      .then(function(response) {
        return $scope.answers = response.data;
      })

      //refers to services/getQuestionDetail (NEED TO WRITE THIS)
      // GetQuestionDetail.getQuestionDetail(questionId)
      //   .then( function(questionData) {
      //     $scope.question = questionData;
      //     return;
      //   })
      //   .then( function() {
      //     //refers to services/getAnswers (NEED TO WRITE THIS)
      //     return GetAnswers.getAnswersByQuestion(questionId)
      //   })
      //   .then (function(answersArray) {
      //     $scope.answers = answersArray;
      //     return;
      //   });
    }

    //Run the init function
    $scope.init();

  }]);

