'use strict';

angular.module('myApp', ['ui.router', 'infinite-scroll'])

    .config(function($stateProvider, $urlRouterProvider) {
    
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
            controller: 'MainCtrl'
        })

        .state('submit', {
            url: '/submit',
            templateUrl: 'views/submit.html',
            controller: 'SubmitCtrl'
        })

        .state('question', {
             url: '/question',
             templateUrl: 'views/question.html',
             controller: 'QuestionCtrl',
             params: {questionID: ''}
        })

        .state('logout', {
             url: '/logout',
             templateUrl: 'views/logout.html',
             controller: 'LogoutCtrl',
        });


});

//require('./src/directives');
