'use strict';

angular.module('ctrls.base', [])

  .controller('BaseCtrl',
    ['$scope', '$rootScope', '$resource', '$http','$location',
      function ($scope, $rootScope, $resource, $http, $location) {

        // we receive this from HttpErrorInterceptor
        $scope.$on('event:loginRequired', function () {
          $location.path('/login');
        });

      }]);
