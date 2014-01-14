/*

 <img image-helper ng-model="modelWithUrl" />

 */

'use strict';

angular.module('directives.imageHelpers', [])

  .directive('imageLoader', [ '$rootScope', function ($rootScope) {
    return {
      restrict: 'EA',
      //templateUrl: '/partials/directives/image-loader.html',
      template: '<div><img ng-show="!hasLoaded" ng-src="/images/spinner.gif"/><img ng-show="hasLoaded" ng-src="{{url}}" onload/></div>',
      transclude: true,
      replace: true,
      scope: {  },
      require: 'ngModel',
      controller: function ($scope) {
        $scope.hasLoaded = false;

        this.setLoaded = function () {
          $scope.$apply($scope.hasLoaded = true);
        };

      },
      link: function (scope, element, attrs, ctrl) {

        var origin = 'directive:imageHelper';
        scope.hasLoaded = false;
//        $rootScope.appLogger.log('have url:' + scope.url, origin);
        scope.onWatch = function(){
          scope.$watch(ctrl.$viewValue, function () {
            scope.url = ctrl.$viewValue;
//            $rootScope.appLogger.log('setting url:' + scope.url, origin);
          });
        };

        // if urls still loaded trigger the onWatch to update Model to get its urls from view
        if ($rootScope.imageUrlsAlreadyLoaded) {
          scope.onWatch();
        }

        // we receive this signal from bookingCtrl if hotelData has loaded successfully
        scope.$on('sig::hotelData::received', function (e) {
//          $rootScope.appLogger.log('received sig::hotelData::received', origin);
          scope.onWatch();
        });

      }
    };
  }
  ])

  .directive('onload', [ '$rootScope', function ($rootScope) {
    return {
      restrict: 'EA',
      scope: {  },
      // request ctrl from image-helper directive ($parent scope = ^) to communicate with it
      require: '^imageLoader',
      link: function (scope, element, attrs, imgLoaderCtrl) {
        // bind the load event
        element.bind('load', function () {
          //use ctrl from image-helper and call its setLoaded()
          imgLoaderCtrl.setLoaded();
        });
      }
    };
  }
  ])

;

