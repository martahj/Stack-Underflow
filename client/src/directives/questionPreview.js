'use strict';

angular.module('myApp')
  .directive('sufQuestionPreview', function() {

  	return {
  		restrict: 'E',
  		scope: {
  			question: "=info"
  		},
  		templateUrl: '../views/directiveViews/questionPreview.html'
  	}
  });
