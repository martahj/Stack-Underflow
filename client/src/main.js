'use strict';
//This is controller for the main page
//It corresponds to the view main.html
angular.module('myApp')
  .controller('MainCtrl', ['$scope', '$window', 'GetQuestions', function($scope, $window, GetQuestions) {

    //This is a placeholder for our array of questions. Eventually, we will get these from the server
    //OUTSTANDING NEED: FUNCTION THAT GETS QUESTIONS FROM THE SERVER, NEWEST FIRST. This is started in services/getQuestions.js
    //This is all the questions, even those not visible yet; as the user scrolls down the page, more of these are added to $scope.questions
    $scope.allQuestions = [
      {title: 'Question 1 Title', preview: 'Question 1 Preview'},
      {title: 'Question 2 Title', preview: 'Question 2 Preview'},
      {title: 'Question 3 Title', preview: 'Question 3 Preview'}, 
      {title: 'Question 4 Title', preview: 'Question 4 Preview'},
      {title: 'Question 5 Title', preview: 'Question 5 Preview'},
      {title: 'Question 6 Title', preview: 'Question 6 Preview'},
      {title: 'Question 7 Title', preview: 'Question 7 Preview'},
      {title: 'Question 8 Title', preview: 'Question 8 Preview'},
      {title: 'Question 9 Title', preview: 'Question 9 Preview'}, 
      {title: 'Question 10 Title', preview: 'Question 10 Preview'},
      {title: 'Question 11 Title', preview: 'Question 11 Preview'},
      {title: 'Question 12 Title', preview: 'Question 12 Preview'},
      {title: 'Question 13 Title', preview: 'Question 13 Preview'},
      {title: 'Question 14 Title', preview: 'Question 14 Preview'},
      {title: 'Question 15 Title', preview: 'Question 15 Preview'}, 
      {title: 'Question 16 Title', preview: 'Question 16 Preview'},
      {title: 'Question 17 Title', preview: 'Question 17 Preview'},
      {title: 'Question 18 Title', preview: 'Question 18 Preview'},
      {title: 'Question 19 Title', preview: 'Question 19 Preview'},
      {title: 'Question 20 Title', preview: 'Question 20 Preview'},
      {title: 'Question 21 Title', preview: 'Question 21 Preview'}, 
      {title: 'Question 22 Title', preview: 'Question 22 Preview'},
      {title: 'Question 23 Title', preview: 'Question 23 Preview'},
      {title: 'Question 24 Title', preview: 'Question 24 Preview'}
    ];
  	//Once we have the function that gets the questions from server, we can populate our questions by calling:
  	//$scope.allQuestions = GetQuestions.getQuestions();

    //number of questions to load initially
    var originalLoad = 10;

    //These are the questions that will appear
    //The view will populate with questions based on the contents of this array
      //The <suf-question-preview> tag in the view refers to the directive questionPreview (suf = stack under flow)
    //init function gives this its original contents  
    $scope.questions = [];

    //number of additional questions to load at once
    var numberOfQuestionsToLoad = 3;

    $scope.loadMore = function() {
      if ($scope.questions.length < $scope.allQuestions.length) {
        console.log('in loadMore');
        $scope.questions = $scope.allQuestions.slice(0, $scope.questions.length + 3);
      }
    };


    $scope.init = function() {
      $scope.questions = $scope.allQuestions.slice(0, originalLoad + 1);
    };

    $scope.init();

  }]);