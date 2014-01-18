'use strict';

var app = angular.module('ctrls.session', []);

app.controller('SessionCtrl',
  ['$scope', '$rootScope', '$resource', '$http', '$timeout', 'Session',
    function ($scope, $rootScope, $resource, $http, $timeout, Session) {

      var origin = 'SessionCtrl';
      var timeout = 9000;

      $scope.logger.log('Hello!', origin);

      // gets called upon sign in click
      $scope.login = function () {
        $scope.clicked = true;
        Session.login($scope.email, $scope.password, function (data, status) {

          // success
          $rootScope.currentUser = Session.currentUser;
          $rootScope.userLoggedIn = Session.isAuthenticated();
          $scope.clicked = false;

        }, function (data, status) {

          // error
          $scope.logger.log(data, origin);
          $scope.failed = true;
          $scope.clicked = false;
          $timeout(function () {
            $scope.failed = false;
            $scope.retry = true;

          }, timeout);

        });
      };

      // gets called upon sign up try
      $scope.signup = function(){
        $scope.clicked = true;
        Session.speedReg($scope.email, function(){
          // success!
          $rootScope.currentUser = Session.currentUser;
          $rootScope.userLoggedIn = Session.isAuthenticated();
          $scope.clicked = false;

        }, function(data, status){
          // error
          $scope.failed = true;
          $scope.errors = data.errors
          $scope.clicked = false;
          $timeout(function () {
            $scope.failed = false;
            $scope.retry = true;
          }, timeout);

        });
      };

      $scope.logout = function(){
        Session.logout(function(){
          // success
          $rootScope.currentUser = Session.currentUser;
          $rootScope.userLoggedIn = Session.isAuthenticated();
        });
      };

    }]);
