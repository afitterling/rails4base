'use strict';

var app = angular.module('AngularApp', [
  // vendor angular stuff
  'ngResource',
  // debugging
  'debug',
  // apps modules
  'interceptors',
  'ctrls.session',
  'sessionService'
]);

app.config(['$httpProvider', function (provider) {

  // headers

  // steal the CSRF-Token on client side from rails server side rendered pages via jQuery
  provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

  // register my interceptors
  //provider.interceptors.push('authReqInterceptor'); // authentication

}]);

// init some stuff
app.run(['$rootScope', '$http', 'logService', 'Session', function ($rootScope, $http, logService, Session) {

  $rootScope.logger = logService;

  // regular expressions needed for validations
  $rootScope.EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  // restore session if user already logged in

  $rootScope.user = Session.requestCurrentUser(function (data, status) {
    if (Session.isAuthenticated()) {
      $rootScope.currentUser = Session.currentUser;
      $rootScope.userLoggedIn = Session.isAuthenticated();
    }
  });

}]);


//app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
//
//  // native urls without '#' for those that can handle it
//  //$locationProvider.html5Mode(true).hashPrefix('!');
//
//  $routeProvider
//    .when('/:page', {
//      templateUrl: function (params, $rootScope) {
//        //return '/partials/' + $rootScope.provider + params.page + '.html';
//        return '/pages/index';
//      }//,
////      controller: 'RoutingCtrl'//,
////      resolve: {
////        loadData: function(){}
////      }
//    })
//    .otherwise({
//      redirectTo: '/'
//    });
//
//}]);
//
//
