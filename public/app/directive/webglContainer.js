'use strict';

angular.module('movieMapApp')
  .directive('webglContainer', [function () {
		return {
			restrict: "A",
			link: function () {
				scene.init();
			}
		};
  }]);
