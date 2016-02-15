'use strict';

angular.module('myApp')
  .directive('sufQuestionOrAnswer', function() {

  	return {
  		restrict: 'E',
  		templateUrl: '../views/directiveViews/qOrA.html'
  	}
  });
