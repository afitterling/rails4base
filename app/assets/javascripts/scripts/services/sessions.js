angular.module('sessionService', [])
  .factory('Session', function ($location, $http, $q) {
    // Redirect to the given url (defaults to '/')
    function redirect(url) {
      url = url || '/';
      $location.path(url);
    }

    var interceptor = {};
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

      speedReg: function(email, successCallback, errorCallback){
        $http.post('/users/sign_up', {user: {email: email} })
          .success(function(data, status){
            successCallback(data, status);
          })
          .error(function(data, status){
            errorCallback(data, status);
          })
      },

      register: function (email, password, confirm_password) {
        return $http.post('/users/sign_up', {user: {email: email, password: password, password_confirmation: confirm_password} })
          .then(function (response) {
            service.currentUser = response.data;
            if (service.isAuthenticated()) {
              $location.path('/record');
            }
          });
      },

      requestCurrentUser: function () {
        if (service.isAuthenticated()) {
          return $q.when(service.currentUser);
        } else {
          return $http.get('/current_user').then(function (response) {
            service.currentUser = response.data.user;
            return service.currentUser;
          });
        }
      },

      currentUser: null,

      isAuthenticated: function () {
        return !!service.currentUser;
      }
    };

    return service;
  });