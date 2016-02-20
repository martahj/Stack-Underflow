'use strict'

angular.module('myApp')
  .service('GoToQuestion', ['$http', '$state', function($http, $state) {

    var questionToView = undefined;
    
    //This function stores which question was clicked on and redirets to the question page
    this.goToQuestion = function(question) {

        //store the question that was clicked on
        //depending on how we end up setting the db up, we may just be able to store the id rather than the whole question
        //however, for now, we're just passing the whole question object in since there's no server to query for question by id
        questionToView = question;

        //redirect to question page
        $location.path('/question');

    };

    this.grabQuestion = function(questID) {
        //return the stored question
        console.log("IN GO TO QUESTION", questID);
        // query database
        $http.get('/api/questions/' + questID)
        .success(function(resp, status) {
            console.log("Got the quest from grab question", resp.singleQuestion[0].questionid);
            // $state.go('question');
        })
    }

    // return {
    //     grabQuestion: this.grabQuestion
    // }

  }]);

