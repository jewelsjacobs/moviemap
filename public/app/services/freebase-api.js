'use strict';

/**
 * Freebase service
 * API Docs: https://developers.google.com/freebase/
 */
angular.module('movieMapApp')
	.factory('FreebaseApi', ['HttpPromise', function (HttpPromise) {

		// Freebase constants
		var KEY = 'AIzaSyCB6HFuNF-E9qTHW9Ba39NgkpHx701gr1Q',
			SEARCH_URL = 'https://www.googleapis.com/freebase/v1/mqlread',
			TOPIC_URL = 'https://www.googleapis.com/freebase/v1/topic/en/',
			MAX_RESULTS = 5,
			config = {
				params : {
					callback: 'JSON_CALLBACK'
				}
			};

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
				config.params.query = [
							{
								"id": null,
								"name": query,
								"type": "/film/film_location",
								"/film/film_location/featured_in_films": []
							}
						];

				return HttpPromise.getResponse(SEARCH_URL, config, 'jsonp');
			},
			getFilmDetails: function (title) {
				config.params.filter = "/film/film";

				var url = TOPIC_URL + title

				return HttpPromise.getResponse(url, config, 'jsonp');
			}
		}
	}]);