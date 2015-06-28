'use strict';

var app = angular.module('gwitter', ['ngRoute', 'firebase'])
  .run(function($rootScope, $firebaseAuth, $window) {
    $rootScope.fbRef = new $window.Firebase('https://twttr.firebaseio.com/');
    $rootScope.fbGweets = new $window.Firebase('https://twttr.firebaseio.com/gweets');
    $rootScope.afAuth = $firebaseAuth($rootScope.fbRef);
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'LoginCtrl',
        templateUrl: 'login.html'
      })
      .when('/home', {
        controller: 'HomeCtrl',
        templateUrl: 'home.html'
      })
      .when('/profile', {
        controller: 'ProfileCtrl',
        templateUrl: 'profile.html'
      })
      .otherwise({
        redirectTo: '/'
      })
  });
