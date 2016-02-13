'use strict'

angular.module('myApp')
  .service('SubmitQuestion', function($http) {

    var Question = function(title, text) {
        return {
            user: "placeholder",
            title: title,
            text: text
        };
    };

    this.submitQ= function(title, text) {
        var newQ = new Question(title, text);

        //This will make a post request to the server with our new data.. eventually
        console.log('Created question object ', newQ);
    };

  });

