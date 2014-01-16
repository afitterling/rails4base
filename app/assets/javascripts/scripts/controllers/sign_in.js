'use strict';

var app = angular.module('ctrls.signUp', []);

app.controller('SignInCtrl',
    ['$scope', '$rootScope', '$resource', '$http',
      function ($scope, $rootScope, $resource, $http) {

        var origin = 'SignInCtrl';

        $scope.logger.log('Hello!', origin);

      }]);
