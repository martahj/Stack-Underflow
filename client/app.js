'use strict';


angular.module('myApp', [
    'myApp.login',
    'ui.router',
    'ngCookies'
  ])

    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
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
             authenticate: true
        })

        .state('logout', {
             url: '/logout',
             templateUrl: 'views/logout.html',
             controller: 'LogoutCtrl',
             authenticate: true
        });

        // We add our $httpInterceptor into the array
        // of interceptors. Think of it like middleware for your ajax calls
        $httpProvider.interceptors.push('Authenticate');

})
.factory('Authenticate', function ($cookies) {
//cookies won't work because a httpOnly flag whcih prevents XSS
//this factory will eventually authenticate the user with the stored token
  // var verify = function (user) {
  //   return $http({
  //   method: 'Get',
  //   url: '/auth/makerpass',
  //   })
  //   .then(function(res) {
  //     console.log("response of controller:", res)
  //   return res
  //   })
  // }
  return {
        request: function (config) {
          console.log("config", config)
            return config //|| $q.when(config)
        },
        response: function (response) {
          console.log('response', response)
            return response //|| $q.when(response);
        },
        responseError: function (response) {
          console.log('response...', response)
            if (response.status === 401) {
                //here I preserve login page 
            }
           // return $q.reject(response);
        }
    };
})
.run(function ($rootScope, $state, $window) {

  // Everything is running, listening for change state and if the next state requires authentication.
$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
  //this works but needs to check if the user is authenitcated along with if the next route
  //requires authentication.
      // if (toState.authenticate){
      //   // User isn’t authenticated, redirect to makerpass
      //   $state.transitionTo("login");
      //   event.preventDefault(); 
      // }
    });
});

