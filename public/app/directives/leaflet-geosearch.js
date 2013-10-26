angular.module('movieMapApp')
	.directive("geoSearch", function () {
	return {
		require: ['^leaflet'],
		restrict: 'A',
		link: function ($scope, $element, $attrs, $leaflet) {
				var map = $leaflet[0].map;

				new L.Control.GeoSearch({
					provider: new L.GeoSearch.Provider.OpenStreetMap()
				}).addTo(map);

			if ($leaflet[0].$parent.$parent.freebase) {
				$('#leaflet-control-geosearch-qry').suggest($leaflet[0].$parent.$parent.freebase).bind("fb-select", function(e, data) {
					alert(data.name + ", " + data.id);
					var ev = jQuery.Event("keydown");
					ev.which = 13; // Enter
					$(e.target).trigger(ev);
				});
			}
		}
	}
});