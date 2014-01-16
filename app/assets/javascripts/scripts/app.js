'use strict';

var app = angular.module('AngularApp', [
  // vendor angular stuff
  'ngResource',
  // debugging
  'debug',
  // apps modules
  'interceptors',
  'ctrls.session',
  'ctrls.signUp',
  'sessionService'
]);

// steal the CSRF-Token
app.config(['$httpProvider', function (provider) {
  // headers
  provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

  // register my interceptors
  //provider.interceptors.push('authReqInterceptor'); // authentication

}]);


// init some stuff
app.run(['$rootScope', '$http', 'logService', function ($rootScope, $http, logService) {

  $rootScope.logger = logService;

  // regular expressions needed for validations
  $rootScope.EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;



//  $http.get('configs/validations').success(function (data) {
//    $rootScope.validations = data;
//    $rootScope.appLogger.log('validations successfully loaded', origin);
//    $rootScope.appLogger.log($scope.validations, origin);
//  });

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
