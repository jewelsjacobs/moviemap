'use strict';

/**
 * Creates Map
 */
angular.module('movieMapApp')
	.controller("MyLocationCtrl", [ '$scope', 'geolocation', 'LeafletApi', function ($scope, geolocation, LeafletApi) {

		// hide map until gps location retrieved
		$scope.show = 'no';

		// center map to gps location
		geolocation.getLocation().then(function (locationData) {

			var position = {
				lat: locationData.coords.latitude,
				lng: locationData.coords.longitude
			}
			console.log(position);
			// setup Map
			angular.extend($scope, LeafletApi.setUp(position, "<b>Your Location</b>"));
			// show map when gps location retrieved
			$scope.show = 'yes';
		});

	}]);