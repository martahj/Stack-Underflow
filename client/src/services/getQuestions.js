'use strict'

angular.module('myApp')
  .service('GetQuestions', function($http) {

    this.getQuestions = function() {
        // Pass along get req to db: /server/index.js
    	return $http({
    		method: 'GET',
    		url: '/api/questions'
    	})
    };


  });
