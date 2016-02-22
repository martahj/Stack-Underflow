'use strict';

angular.module('myApp', [
    'myApp.auth',
    'ui.router',
    'ngCookies',
    'infinite-scroll'
  ])

    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'AuthController'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'AuthController'
        })

        .state('home', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            authenticate: true
        })

        .state('submit', {
            url: '/submit',
            templateUrl: 'views/submit.html',
            controller: 'SubmitCtrl',
            authenticate: true
        })

        .state('question', {
             url: '/question',
             templateUrl: 'views/question.html',
             controller: 'QuestionCtrl',
             authenticate: true,
             params: {questionID: ''}
        })

        .state('logout', {
             url: '/logout',
             templateUrl: 'views/logout.html',
             controller: 'LogoutCtrl',
             authenticate: true
        });

        // We add our $httpInterceptor into the array
        // of interceptors. Think of it like middleware for your ajax calls
        // $httpProvider.interceptors.push('Authenticate');

})
.factory('Authenticate', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.underflow');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
// .run(function ($rootScope, $location, Auth) {
//   // here inside the run phase of angular, our services and controllers
//   // have just been registered and our app is ready
//   // however, we want to make sure the user is authorized
//   // we listen for when angular is trying to change routes
//   // when it does change routes, we then look for the token in localstorage
//   // and send that token to the server to see if it is a real user or hasn't expired
//   // if it's not valid, we then redirect back to signin/signup
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
// });

