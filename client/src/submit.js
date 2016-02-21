'use strict';
//This is controller for the question submission page
//It corresponds to the view submit.html: /views/submit.html
angular.module('myApp')
  .controller('SubmitCtrl', [ '$scope', '$http', '$state', '$cookieStore',  function( $scope, $http, $state, $cookieStore ) {

    //We will need to make sure this matches the limitations in our database

    $scope.maxTitleLength = 100;
    $scope.maxAnswerLength = 1000;

    $scope.submitQ = function(title, text) {
        // Get current date and convert to more legible timestamp
        var timestamp = (Date.now());
        var currentDate = new Date(timestamp);
        // Take data from form, convert to object, send with post req to db
        var data = {title: title, text: text, time: currentDate};
        $http.post("/api/questions", data)
        .success(function(resp, status) {
            console.log("Cookie should not have changed, have to use resp", resp.questid);
            // Cookies act weird on routes, set params instead => Send questid along with get request to DB to get question just asked
            $http.get('/api/questions/' + resp.questid)
            .success(function(resp, status) {
                // Set cookies to questionid for data persist
                $cookieStore.put('qid', resp.singleQuestion[0].questionid);
                // Change state to question to view question asked
                $state.go('question');
            })
        })
    }

  }]);
