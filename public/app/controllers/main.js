'use strict';

angular.module('movieMapApp')
	.controller("MainCtrl", [ '$scope', 'geolocation', 'promiseTracker', function ($scope, geolocation, promiseTracker) {

		$scope.show = 'no';

//		center map to gps location
		geolocation.getLocation().then(function (data) {

			var local_icons = {
				leaf_icon: L.icon({
					iconUrl: 'images/leaf-green.png',
					shadowUrl: 'images/leaf-shadow.png',
					iconSize: [38, 95], // size of the icon
					shadowSize: [50, 64], // size of the shadow
					iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
					shadowAnchor: [4, 62],  // the same for the shadow
					popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
				})
			};

			angular.extend($scope, {
				icons: local_icons
			});

			angular.extend($scope, {
				geo: {
					lat: Math.floor(data.coords.latitude),
					lng: Math.floor(data.coords.longitude),
					zoom: 8
				},
				maxZoom: 18,
				markers: {
					m1: {
						lat: Math.floor(data.coords.latitude),
						lng: Math.floor(data.coords.longitude),
						message: "I'm a static marker",
						icon: local_icons.leaf_icon
					}
				},
				tileLayer: 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
				defaults: {
					scrollWheelZoom: false
				}
			});

			$scope.show = 'yes';

		});

	}]);