'use strict'
//This is controller for the question submission page
//It corresponds to the view submit.html
angular.module('myApp')
  .controller('SubmitCtrl', [ '$scope', '$http', '$state', 'GoToQuestion',  function( $scope, $http, $state, GoToQuestion ) {

    //We will need to make sure this matches the limitations in our database

    $scope.maxTitleLength = 100;
    $scope.maxAnswerLength = 1000;

    $scope.questions = {};

    // Sending post request to server to then insert into DB
    // Eventually need user info to include in data object
    $scope.submitQ = function(title, text) {
        var data = {title: title, text: text};
        $http.post("/api/questions", data)
        // .success(function(resp, status) {
        //     console.log("Successfully asked a question", resp);
        //     $http.get("/api/questions/" + resp.questid)
        //     .success(function(resp, status) {
        //         console.log('Redirecting...', resp.singleQuestion[0]);
        //         $scope.questions[resp.singleQuestion[0].questionid] = resp.singleQuestion[0];
        //         console.log("questions", $scope.questions);
        //     })
        // })
        // possibly want error catching here
        .success(function(resp, status) {
            console.log("Successfully asked a question", resp);
            $http.get('/api/questions/' + resp.questid)
            .success(function(resp, status) {
                console.log("Redirecting?", resp);
                $state.go('home');
            })
        })
    }

  }]);

