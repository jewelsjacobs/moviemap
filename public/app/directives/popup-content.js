'use strict';

/**
 * Compiles template
 */
angular.module('movieMapApp')
	.directive("popupContent", ['$compile', function($compile) {
		return {
			restrict : "A",
			templateUrl: "app/templates/popup-content.html",
			transclude: true,
			replace: true,
			link: function ($scope, $element) {
				$compile($element.contents())($scope);
			}
		}
	}]);