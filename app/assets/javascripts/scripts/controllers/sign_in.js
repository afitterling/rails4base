'use strict';

var app = angular.module('ctrls.signUp', []);

app.controller('SignInCtrl',
  ['$scope', '$rootScope', '$resource', '$http', 'Session',
    function ($scope, $rootScope, $resource, $http, Session) {

      var origin = 'SignInCtrl';

      $scope.logger.log('Hello!', origin);

      $scope.login = function () {
        $scope.logger.log('login func triggered', origin);
        // params come from view
        var res = Session.login($scope.email, $scope.password);
//        res.then(function (result) {
//          console.log(result);
//        });
        console.log(res);
      };

    }]);
