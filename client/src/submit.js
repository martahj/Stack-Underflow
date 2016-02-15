'use strict'

angular.module('myApp')
  .controller('SubmitCtrl', [ '$scope', 'SubmitQuestion', function( $scope, SubmitQuestion ) {
    

    //We will need to make sure this matches the limitations in our database
    $scope.maxTitleLength = 100;
    $scope.maxAnswerLength = 1000;

    //These variables start out empty and are filled out as the user completes the form
    $scope.qTitle = undefined;
    $scope.userInput = undefined;

    $scope.submitQ = SubmitQuestion.submitQ;

  }]);

