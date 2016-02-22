'use strict';
// This is controller for the main page
// It corresponds to the view main.html
// The <suf-question-preview> tag in the view refers to the directive questionPreview (suf = stack under flow): views/directiveViews/questionPreview.html

angular.module('myApp')
.controller('MainCtrl', ['$scope', '$state', '$cookieStore','GetQuestions', function($scope, $state, $cookieStore, GetQuestions) {
  


    ////////// TOOLS FOR GETTING QUESTIONS FROM THE SERVER //////////


     // This array holds the questions that have loaded on the page
     $scope.questions = [];

     // Populates $scope.allQuestions with the questions stored in the db
     $scope.getQuests = function() {
      // Send get req to service for all questions: src/services/getQuestions
       return GetQuestions.getQuestions()
        .then(function(questions) {
          // Populate object with questions retrieved from db
          $scope.questions = questions.data.questions.slice(0, questions.data.questions.length, 1);
        })
        .catch(function(err) {
          console.log(err);
        })
     };

     // Bind id from selected question to cookies
     $scope.setSelected = function (idSelectedQuestion) {
      $cookieStore.put('qid', idSelectedQuestion);
      // Change to single question page
      $state.go('question'); // states described in /views/app.js
     };

     ////////// END OF TOOLS FOR GETTING QUESTIONS FROM SERVER //////////



     ////////// TOOLS FOR INFINITE SCROLL //////////

     // Number of questions to load initially
     $scope.numberToDisplay = 14;

     // Number of additional questions to load at once
     var numberOfQuestionsToLoad = 3;

     // Add more questions to $scope.questions as the user scrolls down
     $scope.loadMore = function() {
      if ($scope.numberToDisplay + 3 < $scope.questions.length) {
          $scope.numberToDisplay += 3;
      } else {
          $scope.numberToDisplay = $scope.questions.length;
      }
     };

     ////////// END OF TOOLS FOR INFINITE SCROLL //////////


 
     $scope.init = function() {
       $scope.getQuests()
     };

     // Initializes page with questions every time main.js is hit
     $scope.init();
  
    }]); 
