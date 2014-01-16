'use strict';

angular.module('ctrls.session', [])

  .controller('SessionCtrl',
    ['$scope', '$rootScope', '$resource', '$http',
      function ($scope, $rootScope, $resource, $http) {

        var origin = 'SessionCtrl';

        $scope.logger.log('Hello!', origin);

      }]);
