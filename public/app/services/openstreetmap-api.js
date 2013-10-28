'use strict';

/**
 * Openstreetmap service
 * API Docs: https://developers.google.com/freebase/
 */
angular.module('movieMapApp')
	.factory('OpenstreetmapApi', [ '$http', '$q', function ($http, $q) {

		// Openstreetmap constants
		var	URL = 'http://nominatim.openstreetmap.org/search';

		return {

			getLocation: function (query) {
				var config = {
					params: {
						format : "json",
						q: query
					}
				};

				var deferred = $q.defer();

				$http.get(URL, config).
					success(function (data) {
						deferred.resolve(data);
						console.log('Successful OpenstreetmapApi response!', data);
					}).
					error(function (data) {
						deferred.reject();
						console.log('Failed OpenstreetmapApi response.', data);
					});
				return deferred.promise;
			}
		}
	}]);