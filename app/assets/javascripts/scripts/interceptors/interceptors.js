// register the interceptor as a service
var mod = angular.module('interceptors',[]);

mod.factory('myHttpInterceptor', function($q) {
  return {
    // optional method
    'request': function(config) {
      // do something on success
      return config || $q.when(config);
    },

    // optional method
    'requestError': function(rejection) {
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    },



    // optional method
    'response': function(response) {
      // do something on success
      return response || $q.when(response);
    },

    // optional method
    'responseError': function(rejection) {
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    }
  };
});

mod.factory('authReqInterceptor', function($q) {
  return {
    'response': function(response) {
      // do something on success
      console.log(response);
      return response || $q.when(response);
    },

    'responseError': function(rejection) {
      // do something on error
      console.log(rejection);
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    }
  };
});


// alternatively, register the interceptor via an anonymous factory
//$httpProvider.interceptors.push(function($q, dependency1, dependency2) {
//  return {
//    'request': function(config) {
//      // same as above
//    },
//
//    'response': function(response) {
//      // same as above
//    }
//  };
//});