'use strict';

angular.module('facialUiApp')
  .filter('toTitleCase', [function () {
		return function (text) {
			return text.replace(/\w\S*/g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}
  }]);
