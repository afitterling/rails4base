'use strict';

angular.module('debugger.logger', []).factory('loggerService', [
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


