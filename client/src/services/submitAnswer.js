'use strict'

angular.module('myApp')
  .service('SubmitAnswer', function($http) {

    var Answer = function(text) {
        return {
            user: "placeholder", //can we get this from a global variable? Need to figure out how to keep track of user
            text: text
        };
    };

    this.submitA= function(text) {
        var newA = new Answer(text);

        //POST request submitting newA to database
    };

  });

