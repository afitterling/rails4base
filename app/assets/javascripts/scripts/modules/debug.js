'use strict';

var module = angular.module('debug', []);

module.factory('logService', [
  function () {
    return {
      messages: [],
      currentMessage: null,
      log: function (msg, origin, topic) {
        //console.log('pushed: ' + msg);
        var time = Date.now();
        //@TODO prevent productive app from logging because of security risks
        this.messages.push({time: time, text: msg, publisher: origin, topic: topic});
        this.currentMessage = msg;
      }
    };
  }
]);

module.directive('console', [ 'logService', function (logService) {
  return {
    restrict: 'EA',
    template: '<div class="debugConsole" style="overflow-y: scroll; background: #888; color: #eee; padding: 5px;"><b>Debugging Console</b><ul style="margin: 5px;" class="messages"><li class="item" style="list-style: none; border-bottom: 1px dashed silver; margin-bottom: 10px;" ng-repeat="msg in messages"><b>[{{msg.time | date:format}}][{{msg.publisher || "unkown" }}]</b> {{msg.text}}</li></ul></div>',
    replace: true,
    link: function (scope, element, attrs, ctrl) {
      // bind the model of attrs 'messsages'
      var loggerMessagesAttr = attrs.messages;

      scope.format = 'yyyy-MM-dd HH:mm:ss';

      // do a deep watch and callback on change
      scope.$watch(loggerMessagesAttr, function () {
        //console.log(loggerService.messages);
        scope.messages = logService.messages;
      }, true);
    }
  };
}
]);
