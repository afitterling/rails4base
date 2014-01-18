'use strict';

var app = angular.module('AngularApp', [
  // vendor angular stuff
  'ngRoute',
  'ngResource',
  // debugging
  'debug',
  // apps modules
  'ctrls.session',
  'ctrls.base',
  'sessionService'
]);

app.config(
  ['$routeProvider', '$httpProvider', '$locationProvider',
    function ($routeProvider, $httpProvider, $locationProvider) {

      // activate push state html5
      $locationProvider.html5Mode(true).hashPrefix('!');

      // headers

      // steal the CSRF-Token on client side from rails server side rendered pages via jQuery
      var authToken = $("meta[name=\"csrf-token\"]").attr("content");
      $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;

      // errorHttpInterceptor

      var errorHttpInterceptor = ['$q', '$location', '$rootScope',
        function ($q, $location, $rootScope) {
          return function (promise) {
            return promise.then(function (response) {
              return response;
            }, function (response) {
              if (response.status === 401) {
                // send login required on 401
                $rootScope.$broadcast('event:loginRequired');
              } else if (response.status >= 400 && response.status < 500) {
                // @TODO failsafes
              }
              return $q.reject(response);
            });
          }
        }];

      // register my interceptors

      $httpProvider.responseInterceptors.push(errorHttpInterceptor);

      // routes
      $routeProvider
        .when('/:page', {
          templateUrl: function (params) {
            if (params.page) {
              return '/angular/pages/' + params.page;
            } else {
              return '/angular/pages/home';
            }
            ;
          }//,
//      controller: 'RoutingCtrl'//,
//      resolve: {
//        loadData: function(){}
//      }
        })
        .otherwise({
          redirectTo: '/'
        });

    }]);


// init some stuff right after bootstraping angular

app.run(['$rootScope', '$http', 'logService', 'Session', function ($rootScope, $http, logService, Session) {

  // patch method

  var defaults = $http.defaults.headers;
  defaults.patch = defaults.patch || {};
  defaults.patch['Content-Type'] = 'application/json';

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
