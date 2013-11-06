'use strict';

/**
 * Film Data
 */
angular.module('movieMapApp')
	.service('Search', function () {
		return {
			data: {},
			options: {
				key: 'AIzaSyBg-XDekBtpbm2Gmksk8xcunU0ezk-q8g8',
				filter: '(all type:/film/film_location)',
				zIndex: 999999999
			}
		}
	});