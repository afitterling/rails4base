'use strict';

var app = angular.module('AngularApp', [
  // vendor angular stuff
  'ngRoute',
  'ngResource',
  // debugging
  'debug',
  // apps modules
  'ctrls.account',
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

                if (response.status === 404) {
                  // send login required on 401
                  $rootScope.$broadcast('event:notFound');
                }

                // temporarily forbidden
                // rails should have sent back data.url (server side: client_path) where we want to go!

                if (response.status === 423) {
                  $rootScope.$broadcast('event:redirect', response.data.path);
                }

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

app.run(['$rootScope', '$http', 'logService', 'Session', '$location', '$templateCache', function ($rootScope, $http, logService, Session, $location, $templateCache) {


  // pre-cache important templates
  // @TODO get templates per json from rails

  var templates = [
    '/angular/pages/home',
    '/angular/pages/features'
  ];

  for (var i = 0; i < templates.length; i++) {
    $http.get(templates[i])
      .success(function (data) {
        $templateCache.put(templates[i], data);
      });
  }

  // patch method

  var defaults = $http.defaults.headers;
  defaults.patch = defaults.patch || {};
  defaults.patch['Content-Type'] = 'application/json';

  $rootScope.logger = logService;


  // regular expressions needed for validations

  $rootScope.EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;


  // restore session if user already logged in

  $rootScope.currentUser = Session.requestCurrentUser(function (data, status) {

    if (Session.isAuthenticated()) {
      $rootScope.currentUser = Session.currentUser;
      $rootScope.userLoggedIn = Session.isAuthenticated();
    }

  });


  // we receive this from HttpErrorInterceptor on 401
  $rootScope.$on('event:loginRequired', function () {
    $location.path('/login');
  });

  // we get this upon 423 and got url sent back from server
  $rootScope.$on('event:redirect', function (e, url) {
    $location.path(url);
  });

  // 404
  $rootScope.$on('event:notFound', function () {
    $location.path('/404');
  });

  $rootScope.$on('$routeChangeStart', function (e, next, cur) {
    $rootScope.loadingTemplate = true
  });

  $rootScope.$on('$routeChangeSuccess', function (e, cur, prev) {
    // @TODO
  });

  $rootScope.$on('$viewContentLoaded', function () {
    $rootScope.loadingTemplate = false
  });

}])
;
