'use strict'

angular.module('myApp')
  .service('GoToQuestion', function($location) {

    this.questionToView = undefined;
    
    //This should be called when a question preview is clicked on.
    //For reasons unknown, the question preview is not registering clicks, even on a dummy console log function
    this.goToQuestion = function(question) {
        // alert('clicked on ', question);

        //set question page's question to the clicked question
        this.questionToView = question;

        //redirect to question page
        $location.path('/question');

    };

    this.grabQuestion = function() {
        return this.questionToView;
    }

  });

