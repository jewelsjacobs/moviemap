'use strict';

/**
 * Creates Map with movie info from current gps location
 */
angular.module('movieMapApp')
	.controller("MyLocationCtrl", [
		'$scope',
		'geolocation',
		'OpenstreetmapApi',
		'LeafletApi',
		'Location',
		'FilmApi',
		'$http',
		'$compile',
		function ($scope, geolocation, OpenstreetmapApi, LeafletApi, Location, FilmApi, $http, $compile) {

			// hide map until gps location retrieved
			$scope.show = 'no';

			geolocation.getLocation().then(
				function (locationData) {
					var position = {
						lat : locationData.coords.latitude,
						lon : locationData.coords.longitude
					}
					Location.results.position = position;

					OpenstreetmapApi.getLocationName(Location.results.position).
						then(function (positionData){
							Location.results.name = positionData.address.city;
							FilmApi.createFimDetails();
							$http(FilmApi.TEMPLATE).
								success(function (r) {
								angular.extend($scope, LeafletApi.setUp(Location.results.position, $compile(r)($scope)));
								$scope.show = 'yes';
							});

						});

				})
		}]);