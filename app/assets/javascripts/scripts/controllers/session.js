'use strict';

var app = angular.module('ctrls.session', []);

app.controller('SessionCtrl',
  ['$scope', '$rootScope', '$resource', '$http', '$timeout', 'Session',
    function ($scope, $rootScope, $resource, $http, $timeout) {

      var origin = 'SessionCtrl';

      $scope.logger.log('Hello!', origin);

      $scope.login = function () {
        $scope.logger.log('login func triggered', origin);

        $http.post('/users/sign_in', {user: {email: $scope.email, password: $scope.password} }).success(function (data, status) {
//          console.log(data);
//          console.log(status);
          if (status === 200) {
            console.log(data);
          }
        }).error(function (data, status, headers, config) {
            console.log(status);
            if (status === 401) {
              $scope.failed = true;
              $timeout(function () {
                $scope.failed = false;
                $scope.retry = true;
              }, 4000);
            }
          });

      };

    }]);
