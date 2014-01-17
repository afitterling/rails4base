angular.module('sessionService', [])
  .factory('Session', ['$location', '$http', '$q', function ($location, $http, $q) {

    var service = {

      login: function (email, password, successCallback, errorCallback) {
        $http.post('/users/sign_in', {user: {email: email, password: password} })
          .success(function (data, status) {
            if (status === 200) {
              service.currentUser = data.user;
              successCallback(data, status);
            }
          }).error(function (data, status, headers, config) {
            errorCallback(data, status);
          });
        return;
      },

      logout: function (redirectTo) {
        $http.post('/logout').then(function () {
          service.currentUser = null;
          redirect(redirectTo);
        });
      },

      // I implemented this to registrate via email only really fast! passwd will be auto gen. and kept on server and send by mail
      speedReg: function (email, successCallback, errorCallback) {
        $http.post('/users/sign_up', {user: {email: email} })
          .success(function (data, status) {
            service.currentUser = data.user;
            successCallback(data, status);
          })
          .error(function (data, status) {
            errorCallback(data, status);
          })
      },
//
//      register: function (email, password, confirm_password) {
//        return $http.post('/users', {user: {email: email, password: password, password_confirmation: confirm_password} })
//          .then(function (response) {
//            service.currentUser = response.data;
//            if (service.isAuthenticated()) {
//              $location.path('/record');
//            }
//          });
//      },

      requestCurrentUser: function (successCallback) {

        $http.get('/users/restore').success(function (data, status) {
          service.currentUser = data.user;

          successCallback(data, status);
        }).error();
        return;
      },

      currentUser: null,

      isAuthenticated: function () {
        return !!service.currentUser;
      }
    };

    return service;
  }]);