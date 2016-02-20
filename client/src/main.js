'use strict';
//This is controller for the main page
//It corresponds to the view main.html
//The <suf-question-preview> tag in the view refers to the directive questionPreview (suf = stack under flow)

angular.module('myApp')
.controller('MainCtrl', ['$scope', '$window', 'GetQuestions', function($scope, $window, GetQuestions) {

    /* TOOLS FOR GETTING QUESTIONS FROM THE SERVER */

    //This object holds all the questions, irrespective of whether they have appeared on the page or not
     $scope.allQuestions = {};

     //This function (called during init) populates $scope.allQuestions with the questions stored in the db
     $scope.getQuests = function() {
        console.log('in getQuests');
       return GetQuestions.getQuestions()
        .then(function(questions) {
          $scope.allQuestions = questions.data;
          console.log("addingquestions to $scope", $scope.allQuestions)
        })
        .catch(function(err) {
          console.log(err);
        })
     };

     /* END OF TOOLS FOR GETTING QUESTIONS FROM SERVER */




     /* TOOLS FOR INFINITE SCROLL */

     //This array holds the questions that have loaded on the page
     $scope.questions = [];
     
     //Number of questions to load initially
     //If this is doesn't cover the whole page, infinite scroll won't work
     var originalLoad = 14;

     //Number of additional questions to load at once
     var numberOfQuestionsToLoad = 3;

     //Add more questions to $scope.questions as the user scrolls down
     $scope.loadMore = function() {
      // KK: always getting an error Cannot read property 'length' of undefined => $scope.allQuestions is empty
      // But, infinite scroll is still working
       if ($scope.questions.length < $scope.allQuestions.questions.length) {
         $scope.questions = $scope.allQuestions.questions.slice(0, $scope.questions.length + 3);
       }
     };

     /* END OF TOOLS FOR INFINITE SCROLL */



 
     $scope.init = function() {
       $scope.getQuests()
         .then( function() {
            $scope.questions = $scope.allQuestions.questions.slice(0, originalLoad,  1);
         }); 
     };

     $scope.init();
  
    }]); 
