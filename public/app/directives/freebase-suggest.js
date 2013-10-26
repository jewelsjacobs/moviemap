'use strict';

/**
 * Adds Freebase Suggest to Leaflet GeoSearch Autocomplete
 */
angular.module('movieMapApp')
	.directive("freebaseSuggest", function () {
	return {
		require: ['^geoSearch', '^leaflet'],
		restrict: 'A',
		link: function ($scope, $element, $attrs, $geoSearch) {
			// freebase auto suggest
			if ($geoSearch[0].$parent.$parent.freebase) {
				$('#leaflet-control-geosearch-qry').suggest($geoSearch[0].$parent.$parent.freebase).bind("fb-select", function(e, data) {
					alert(data.name + ", " + data.id);
					var ev = jQuery.Event("keydown");
					ev.which = 13; // Enter
					$(e.target).trigger(ev);
				});
			}
		}
	}
});