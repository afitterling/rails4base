

var mod = angular.module('interceptors', []);

mod.factory('errorHttpInterceptor',
  ['$q', '$location', '$rootScope',
    function ($q, $location, $rootScope) {
      return function (promise) {
        return promise.then(function (response) {
          return response;
        }, function (response) {
          if (response.status === 401) {
            $rootScope.$broadcast('event:loginRequired');
          } else if (response.status >= 400 && response.status < 500) {
            // @TODO
          }
          return $q.reject(response);
        });
      }
    }]);
