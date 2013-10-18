'use strict';

angular.module('facialUiApp')
  .directive('debug', [function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the debug directive');
      }
    };
  }]);
