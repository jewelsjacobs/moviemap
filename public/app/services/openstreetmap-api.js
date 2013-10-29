'use strict';

/**
 * Openstreetmap service
 */
angular.module('movieMapApp')
	.factory('OpenstreetmapApi', [ 'HttpPromise', function (HttpPromise) {

		var SEARCH_URL = 'http://nominatim.openstreetmap.org/search',
			REVERSE_URL = 'http://nominatim.openstreetmap.org/reverse',
			config = {
				params: {}
			};

		config.params.format = "json";

		return {
			getLocationPosition: function (query) {
				config.params.q = query;
				return HttpPromise.getResponse(SEARCH_URL, config, 'get');
			},
			getLocationName: function (position) {
				config.params.lat = position.lat;
				config.params.lon = position.lng;
				return HttpPromise.getResponse(REVERSE_URL, config, 'get');
			}
		}
	}]);