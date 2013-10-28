'use strict';

/**
 * Film Data
 * API Docs: https://developers.google.com/freebase/
 */
angular.module('movieMapApp')
	.service('Film', function () {
		return {
			results: {}
		}
	});