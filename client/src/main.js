'use strict';

angular.module('myApp')
  .controller('MainCtrl', ['$scope', 'GoToQuestion', function($scope, GoToQuestion) {

    //This is a placeholder for our array of questions. Eventually, we will get these from the server
  	$scope.questions = [
      {title: 'Question 1 Title', preview: 'Question 1 Preview words words words'},
      {title: 'Question 2 Title', preview: 'Question 2 Preview'}
  	];

    $scope.goToQuestion = GoToQuestion.goToQuestion;


  }]);