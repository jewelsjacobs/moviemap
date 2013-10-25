'use strict';

/**
 * Freebase service
 * API Docs: https://developers.google.com/freebase/
 */
angular.module('movieMapApp')
	.directive('myPane', function() {
		return {
			restrict: 'A',
			link: function(scope, element) {
				var map =
				new L.Control.GeoSearch({
					provider: new L.GeoSearch.Provider.OpenStreetMap()
				}).addTo(map);
			}
		};
	});