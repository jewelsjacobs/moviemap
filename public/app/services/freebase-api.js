'use strict';

/**
 * Freebase service
 * API Docs: https://developers.google.com/freebase/
 */
angular.module('movieMapApp')
	.factory('FreebaseApi', [ '$http', '$q', function ($http, $q) {

		// Freebase constants
		var KEY = 'AIzaSyCB6HFuNF-E9qTHW9Ba39NgkpHx701gr1Q',
			SEARCH_URL = 'https://www.googleapis.com/freebase/v1/search',
			MQL_URL = 'https://www.googleapis.com/freebase/v1/mqlread',
			MAX_RESULTS = 10;

		return {
			// options for freebase suggest
			options: function (filter) {
				return {
					key: KEY,
					url: SEARCH_URL,
					max_results: MAX_RESULTS,
					filter: filter,
					zIndex: 999999999
				}
			},
			getFilmTitleData: function (query) {
				var config = {
					params: {
						query: [{
							"id": null,
							"name": query,
							"type": "/film/film_location",
							"/film/film_location/featured_in_films": []
						}],
						callback: 'JSON_CALLBACK'
					}
				};

				var deferred = $q.defer();

				$http.jsonp(MQL_URL, config).
					success(function (data) {
						deferred.resolve(data);
						console.log('Successful FreebaseAPI response!', data);
					}).
					error(function (data) {
						deferred.reject();
						console.log('Failed FreebaseAPI response.', data);
					});
				return deferred.promise;
			}
		}
	}]);