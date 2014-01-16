'use strict';

var app = angular.module('AngularApp', [
  // vendor angular stuff
  'ngResource',
  // apps modules
  'ctrls.session'
]);

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
