'use strict';

var app = angular.module('AngularApp', [
  // vendor angular stuff
  'ngResource',
  // debugging
  'debug',
  // apps modules
  'ctrls.session',
  'ctrls.signUp',
]);


app.run(['$rootScope','$http', 'logService', function($rootScope, $http, logService){
  // init some stuff

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
