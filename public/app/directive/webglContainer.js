'use strict';

angular.module('facialUiApp')
  .directive('webglContainer', [function () {
		return {
			restrict: "A",
			link: function () {
				scene.init();
			}
		};
  }]);
