'use strict'

angular.module('myApp')
  .service('SubmitQuestion', function($http) {

    var Question = function(title, text) {
        return {
            user: "placeholder", //can we get this from a global variable? Need to figure out how to keep track of user
            title: title,
            text: text
        };
    };

    this.submitQ= function(title, text) {
        var newQ = new Question(title, text);

        //POST request submitting newQ to database
    };

  });

