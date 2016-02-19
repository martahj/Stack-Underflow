//'use strict';
//this is being called by the login button on the login page
//this calls the factory function Login.verify below 
//then sets the result in localStorage
angular.module('myApp.login', [])
  .controller('LoginCtrl', function ($scope, $window, Login) {
    $scope.authoreyes = function() {
    	Login.verify()
    	.then(function(res) {
    		console.log('authoreyes res', res)
    		$window.localStorage.setItem('session', res)
    		$location.path('home')
    	}).catch(function(err) {
    		console.log("Error:", err)
    		$location.path('login');
    	})
    }
  })

//This creates a get request to the server... Eventually the Url will
//be /api/login which will fetch the user information from the database
  .factory('Login', function($http, $location, $window) {
    var verify = function (user) {
      return $http({
      method: 'Get',
      url: '/auth/makerpass'
      })
      .then(function(resp) {
          console.log("response of controller:", res)
      return res
      })
    }

    return {
        verify: verify
    }
})


