'use strict';

angular.module('ctrls.base', [])

  .controller('BaseCtrl',
    ['$scope', '$rootScope', '$resource', '$http',
      function ($scope, $rootScope, $resource, $http) {

        // we receive this from HttpErrorInterceptor
        $scope.$on('event:loginRequired', function () {
          $location.path('/login');
        });

      }]);
