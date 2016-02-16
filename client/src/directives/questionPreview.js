'use strict';

angular.module('myApp')
  .directive('sufQuestionPreview', function(GoToQuestion) {
    //This directive controls the question preview. Clicking on a question title takes you to that question's page

  	return {
  		restrict: 'E',
  		scope: {
  			question: "=info"
  		},
  		templateUrl: '../views/directiveViews/questionPreview.html',
  		link: function($scope, element, attrs) {
        //This references the service GoToQuestion
  			$scope.goToQuestion = GoToQuestion.goToQuestion;
  		}
  	}
  });
