'use strict';

/**
 * Adds GeoSearch Autocomplete to Leaflet Map
 */
angular.module('movieMapApp')
	.directive("geoSearch", function () {
	return {
		require: ['^leaflet'],
		restrict: 'A',
		controller: function($scope) {
			return $scope;
		},
		link: function ($scope, $element, $attrs, $leaflet) {
				var map = $leaflet[0].map;

				new L.Control.GeoSearch({
					provider: new L.GeoSearch.Provider.OpenStreetMap()
				}).addTo(map);
		}
	}
});