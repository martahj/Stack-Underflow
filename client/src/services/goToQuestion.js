'use strict'

angular.module('myApp')
  .service('GoToQuestion', ['$http', '$state', function($http, $state) {

    // var questionToView = undefined;
    
    //This function stores which question was clicked on and redirets to the question page
    // this.goToQuestion = function(question) {

    //     //store the question that was clicked on
    //     //depending on how we end up setting the db up, we may just be able to store the id rather than the whole question
    //     //however, for now, we're just passing the whole question object in since there's no server to query for question by id
    //     questionToView = question;

    //     //redirect to question page
    //     $location.path('/question');

    // };

    this.grabQuestion = function(questID) {
        console.log("Getting question ", questID);
        // Query DB for question, send questionid as param (cookies don't mix well with routes)
        return $http.get('/api/questions/' + questID)
        .success(function(resp, status) {
            // Send question back to controller
            console.log("Here's the question from grab question", resp.singleQuestion[0]);
            return resp;
        })
    }


  }]);

