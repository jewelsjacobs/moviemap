'use strict';

/**
 * Freebase service
 * API Docs: https://developers.google.com/freebase/
 */
angular.module('movieMapApp')
	.factory('FreebaseApi', ['HttpPromise', '$filter', function (HttpPromise, $filter) {

		// Freebase constants
		var KEY = 'AIzaSyCB6HFuNF-E9qTHW9Ba39NgkpHx701gr1Q',
			SEARCH_URL = 'https://www.googleapis.com/freebase/v1/mqlread',
			TOPIC_URL = 'https://www.googleapis.com/freebase/v1/topic/',
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
			getLocationName:function() {

			},
			getLocationCoordinates:function(){

			},
			getFilmTtitleData:function(query) {
				var url = TOPIC_URL + query;
				config.params.filter = "/film/film_location/featured_in_films";

				return HttpPromise.getResponse(url, config, 'jsonp');
			},
			getFilmTopicData:function(query) {
				var url = TOPIC_URL + query;
				config.params.filter = "/common/topic";

				return HttpPromise.getResponse(url, config, 'jsonp');
			}
		}
	}]);