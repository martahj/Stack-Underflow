'use strict';

angular.module('myApp')
  .controller('MainCtrl', ['$scope', function($scope) {

    //This is a placeholder for our array of questions. Eventually, we will get these from the server
  	$scope.questions = [
      {title: 'A question 1', preview: 'Blahdidity blah blah'},
      {title: 'A question 2', preview: 'I have  a question'}
  	];


  }])
  // .directive('sufQuestionPreview', function() {

  // 	return {
  // 		restrict: 'E',
  // 		scope: {
  // 			question: "=info"
  // 		},
  // 		templateUrl: './views/directiveViews/questionPreview.html'
  // 	}
  // })
