'use strict';

angular.module('myApp')
  .directive('sufQuestionPreview', function() {

  	return {
  		restrict: 'E',
  		scope: {
  			info: "="
  		},
  		templateUrl: '../views/directiveViews/questionPreview.html'
  	}
  });
