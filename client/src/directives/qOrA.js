'use strict';
//This will be the form that allows users to submit a question or answer.
//We need to build this out, including the toolbar and codemirror part
angular.module('myApp')
  .directive('sufQuestionOrAnswer', function() {

   //  this.getHtmlContent: function() {
  	// 		console.log('html', htmlcontent);
  	// }

  	return {
  		restrict: 'E',
  		templateUrl: '../views/directiveViews/qOrA.html',
  	}
  });
