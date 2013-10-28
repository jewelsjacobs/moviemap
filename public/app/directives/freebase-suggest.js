'use strict';

/**
 * Adds Freebase Suggest to Leaflet GeoSearch Autocomplete
 */
angular.module('movieMapApp')
	.directive("freebaseSuggest", ["$location", 'FreebaseApi', function ($location, FreebaseApi) {

		return {
			restrict: 'A',
			link: function () {
				$('#search').
					suggest(FreebaseApi.options('(all type:/film/film_location)'))
					.bind("fb-select", function (e, data) {
						$location.path("/movies/location/" + data.name);
					});
			}
		}
	}]);