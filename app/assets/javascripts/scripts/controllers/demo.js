'use strict';

angular.module('ctrls.demo', [])

  .controller('DemoCtrl',
    ['$scope', '$rootScope', '$resource', '$http','$location',
      function ($scope, $rootScope, $resource, $http, $location) {

        $scope.getDemoData = function(){
          $http.get('/api/json/').success(function(data, status){
            $scope.data = {data: data, status: status};
          }).error(function(data, status){
            $scope.data = {data: data, status: status};
          });
        }

      }]);

