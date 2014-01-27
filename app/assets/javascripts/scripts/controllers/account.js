'use strict';

var app = angular.module('ctrls.account', []);

app.controller('AccountCtrl',
  ['$scope', '$rootScope', '$resource', '$http', '$timeout', 'Session','$location',
    function ($scope, $rootScope, $resource, $http, $timeout, Session, $location) {

      var origin = 'AccountCtrl';

      // safety time out for failed action before retry
      var timeout = 9000;

//      $scope.logger.log('Hello!', origin);

      // gets called upon sign in
      $scope.login = function () {
        $scope.clicked = true;
        Session.login($scope.email, $scope.password, function (data, status) {

          // success
          $rootScope.currentUser = Session.currentUser;
          $rootScope.userLoggedIn = Session.isAuthenticated();
          $scope.clicked = false;

          $location.path('/profile');

        }, function (data, status) {

          // error
          $scope.logger.log(data, origin);
          $scope.failed = true;
          $scope.clicked = false;
          $timeout(function () {
            $scope.failed = false;
            $scope.retry = true;

          }, timeout);

        });
      };

      // gets called upon sign up attempt
      $scope.signup = function () {
        $scope.clicked = true;
        Session.speedReg($scope.email, function () {
          // success!
          $rootScope.currentUser = Session.currentUser;
          $rootScope.userLoggedIn = Session.isAuthenticated();
          $scope.clicked = false;

        }, function (data, status) {
          // error
          $scope.failed = true;
          $scope.errors = data.errors
          $scope.clicked = false;
          $timeout(function () {
            $scope.failed = false;
            $scope.retry = true;
          }, timeout);

        });
      };

      // logout
      $scope.logout = function () {
        Session.logout(function (data, status, headers) {
          // success
          $rootScope.currentUser = Session.currentUser;
          $rootScope.userLoggedIn = Session.isAuthenticated();
        });
      };

      $scope.resendConfirmationRequest = function(){
        Session.confirmationRequest();
      };

      $scope.changePassword = function(password){
        var Password = $resource('/users/password', {id: '@id'}, { update: { method: 'PATCH', headers: { 'Content-Type': 'application/json' } } });
        Password.update({id: $scope.currentUser.id, password: password}, function(){
          // success
          Session.login($scope.currentUser.email, password, function(){}, function(){});
          $scope.passwordChanged = true;
        }, function(){});
      };

    }]);
