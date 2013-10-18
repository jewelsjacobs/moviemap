'use strict';

angular.module('movieMapApp')
  .filter('toName', [function () {
		return function (text) {
			return text.replace('_', ' ').replace(/\w\S*/g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}
  }]);
