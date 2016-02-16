'use strict';
//This is controller for the main page
//It corresponds to the view main.html
angular.module('myApp')
  .controller('MainCtrl', ['$scope', 'GetQuestions', function($scope, GetQuestions) {

    //This is a placeholder for our array of questions. Eventually, we will get these from the server
    //The view will populate with questions based on the contents of this array
      //The <suf-question-preview> tag in the view refers to the directive questionPreview (suf = stack under flow)
    //OUTSTANDING NEED: FUNCTION THAT GETS QUESTIONS FROM THE SERVER, NEWEST FIRST. This is started in services/getQuestions.js
  	$scope.questions = [
      {title: 'Question 1 Title', preview: 'Question 1 Preview words words words'},
      {title: 'Question 2 Title', preview: 'Question 2 Preview'}
  	];
  	//Once we have the function that gets the questions from server, we can populate our questions by calling:
  	//$scope.questions = GetQuestions.getQuestions();

  }]);