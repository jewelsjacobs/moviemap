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
		function ($scope, geolocation, OpenstreetmapApi, LeafletApi, Location, FilmApi) {

			// hide map until gps location retrieved
			$scope.show = 'no';

			geolocation.getLocation().then(
				/**
				 * Assigns location position to Location factory
				 * @param locationData {obj}
				 */
					function (locationData) {
					var position = {
						lat: locationData.coords.latitude,
						lng: locationData.coords.longitude
					}
					Location.results.position = position;

					$scope.details = null;

					OpenstreetmapApi.getLocationName(Location.results.position).
						then(
						/**
						 * Assigns location name to Location factory
						 * @param positionData {obj}
						 */
							function (positionData) {
							Location.results.name = positionData.address.city;
							$scope.details = FilmApi.createFimDetails();
							$scope.$watch('details', function (newval, oldval) {
								if (newval != null) {
									console.log("newval", newval, "oldval", oldval);
								}
//								var popUpContent = document.querySelector("#popUp");
//								var htmlString = angular.element(popUpContent).html();
//								angular.extend($scope, LeafletApi.setUp(Location.results.position, htmlString));
//								$scope.show = 'yes';
							});
						});



				})
		}]);