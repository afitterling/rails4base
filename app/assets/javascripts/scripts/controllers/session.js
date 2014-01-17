'use strict';

var app = angular.module('ctrls.session', []);

app.controller('SessionCtrl',
  ['$scope', '$rootScope', '$resource', '$http', '$timeout', 'Session',
    function ($scope, $rootScope, $resource, $http, $timeout, Session) {

      var origin = 'SessionCtrl';

      $scope.logger.log('Hello!', origin);

      // gets called upon sign in click
      $scope.login = function () {

        Session.login($scope.email, $scope.password, function (data, status) {

          // success
          $rootScope.currentUser = Session.currentUser;
          $rootScope.userLoggedIn = true;

        }, function (data, status) {

          // error
          $scope.logger.log(data, origin);
          $scope.failed = true;
          $timeout(function () {
            $scope.failed = false;
            $scope.retry = true;
          }, 4000);

        });
      };

      // gets called upon sign up try
      $scope.signup = function(){
        console.log('got called');
        Session.speedReg($scope.email, function(){

        }, function(){

        });
      };

    }]);
