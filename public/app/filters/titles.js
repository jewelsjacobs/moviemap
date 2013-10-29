'use strict';

/**
 * Title filter
 */
angular.module('movieMapApp')
	.filter('titles', function() {
		return function(input) {
			var lowercase = input.toLowerCase();
			var addedUnderscores = lowercase.replace(/\s/gi,"_");
			var stripped = addedUnderscores.replace(/[',\?!\.`'"&]/gi,"");
			return stripped.replace(/amp;/gi,"");
		};
	});