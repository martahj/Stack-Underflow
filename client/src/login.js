//'use strict';
//this is being called by the login button on the login page
//this calls the factory function Login.verify below 
//then sets the result in localStorage
angular.module('myApp.auth', [])
  .controller('AuthController', function ($scope, $window, Auth) {
    $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.underflow', token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        console.log("TOKKKKKEN", token)
        // $window.localStorage.setItem('com.underflow', token);
        // $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
})
//This authenticates the user by exchanging the user's username and password
//for a JWT from the server.
  .factory('Auth', function ($http, $location, $window) {
      var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.underflow');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.underflow');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})


