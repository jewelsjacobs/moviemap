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
			getFilmTitleData: function (query) {
				var mql = [
							{
								"id": null,
								"name": query,
								"type": "/film/film_location",
								"/film/film_location/featured_in_films": []
							}
						];

				config.params.query = $filter('json')(mql);

				return HttpPromise.getResponse(SEARCH_URL, config, 'jsonp');
			},
			getFilmTopic:function(query) {
				var url = TOPIC_URL + query;
				config.params.filter = "/common/topic";

				return HttpPromise.getResponse(url, config, 'jsonp');
			},
			getFilmDetails: function (query) {
				var mql = [{
					"id": null,
					"name": query,
					"type": "/film/film",
					"tagline": [{
						"lang": "/lang/en",
						"limit": 1,
						"optional": true,
						"type": "/type/text",
						"value": null
					}],
					"trailers": [],
					"starring": [],
					"initial_release_date": [],
					"directed_by": [],
					"genre": [],
					"written_by": [],
					"rating": [],
					"subjects": [],
					"limit": 1
				}];

				config.params.query = $filter('json')(mql);

				return HttpPromise.getResponse(SEARCH_URL, config, 'jsonp');
			}
		}
	}]);