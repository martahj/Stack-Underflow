'use strict'
//This is controller for the question submission page
//It corresponds to the view submit.html
angular.module('myApp')
  .controller('SubmitCtrl', [ '$scope', 'SubmitQuestion', function( $scope, SubmitQuestion ) {
    
    //We will need to make sure this matches the limitations in our database
    $scope.maxTitleLength = 100;
    $scope.maxAnswerLength = 1000;

    //These variables start out empty and are filled out as the user completes the form
    $scope.qTitle = undefined;
    $scope.userInput = undefined;

    //Submits the question to the database.. references services/submitQ (THIS NEEDS TO BE WRITTEN)
    $scope.submitQ = SubmitQuestion.submitQ;

  }]);

