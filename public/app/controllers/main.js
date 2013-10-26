'use strict';

angular.module('movieMapApp')
	.controller("MainCtrl", [ '$scope', 'geolocation', 'Map', function ($scope, geolocation, Map) {

		// hide map until gps location retrieved
		$scope.show = 'no';

		function setUpMap(data) {
			var mapOptions = Map.getMapOptions(data);
			// leaflet options
			angular.extend($scope, mapOptions.leaflet);
			// freebase search options
			angular.extend($scope, Map.getFreebaseOptions);
		}

		// center map to gps location
		geolocation.getLocation().then(function (data) {
			// setup Map
			setUpMap(data);
			// show map when gps location retrieved
			$scope.show = 'yes';
		});

	}]);