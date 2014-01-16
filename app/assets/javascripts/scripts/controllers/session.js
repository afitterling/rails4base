'use strict';

var app = angular.module('ctrls.session', []);

app.controller('SessionCtrl',
  ['$scope', '$rootScope', '$resource', '$http', '$timeout', 'Session',
    function ($scope, $rootScope, $resource, $http, $timeout, Session) {

      var origin = 'SessionCtrl';

      $scope.logger.log('Hello!', origin);

      // gets called upon signin click
      $scope.login = function () {

        Session.login($scope.email, $scope.password, function (data, status) {

          // success
          $scope.logger.log(data, origin);
          $scope.logger.log('User=', origin);
          $scope.logger.log(Session.currentUser, origin);

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

    }]);
