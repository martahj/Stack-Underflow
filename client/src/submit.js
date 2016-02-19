'use strict'
//This is controller for the question submission page
//It corresponds to the view submit.html
angular.module('myApp')
  .controller('SubmitCtrl', [ '$scope', '$http', function( $scope, $http ) {
    
    //We will need to make sure this matches the limitations in our database
    $scope.maxTitleLength = 100;
    $scope.maxAnswerLength = 1000;

    //These variables start out empty and are filled out as the user completes the form
    $scope.qTitle = undefined;
    $scope.userInput = undefined;

    // Sending post request to server to then insert into DB
    // Eventually need user info to include in data object
    $scope.submitQ = function(title, text) {
        var data = {title: title, text: text};
        $http.post("/api/questions", data)
        .success(function(resp, status) {
            console.log("Successfully asked a question", resp.questid);
            $http.get("/api/questions/" + resp.questid)
            .success(function(resp, status) {
                console.log('Redirecting...');
            })
        })
        // possibly want error catching here
    }

  }]);

