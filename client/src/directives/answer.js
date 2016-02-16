'use strict';

angular.module('myApp')
  .directive('sufAnswer', function() {

  	return {
  		restrict: 'E',
  		scope: {
  			answer: "=info"
  		},
  		templateUrl: '../views/directiveViews/answer.html'
  	}
  });
