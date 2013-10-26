'use strict';

/**
 * Adds Freebase Suggest to Leaflet GeoSearch Autocomplete
 */
angular.module('movieMapApp')
	.directive("freebaseSuggest", ["$location", function ($location) {
	return {
		require: ['^geoSearch', '^leaflet'],
		restrict: 'A',
		link: function ($scope, $element, $attrs, $geoSearch) {
			// freebase auto suggest
			if ($geoSearch[0].$parent.$parent.freebase) {
				$('#leaflet-control-geosearch-qry').suggest($geoSearch[0].$parent.$parent.freebase).bind("fb-select", function(e, data) {
					$location.path("/movies/location/" + data.name);
				});
			}
		}
	}
}]);