'use strict';
//depending on makerpass format, this page may not be needed
angular.module('myApp')
  .controller('LogoutCtrl', ['$scope', '$window', '$state', function($scope, $window, $state) {
  	$window.localStorage.removeItem('com.underflow');
  	$state.go('login');
  }]);
