'use strict';

angular.module('ctrls.base', [])

  .controller('BaseCtrl',
    ['$scope', '$rootScope', '$resource', '$http','$location',
      function ($scope, $rootScope, $resource, $http, $location) {

        $scope.getDemoData = function(){
          $http.get('/api/json/').success(function(data){
            console.log(data);
          }).error(function(data, status){
            console.log(status);
          });
        }

      }]);

