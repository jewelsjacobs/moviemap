'use strict';

/**
 * Loads
 */
angular.module('movieMapApp')
	.controller("LoadCtrl", [
		'$scope',
		'FreebaseApi',
		'geolocation',
		'OpenstreetmapApi',
		function ($scope, FreebaseApi, geolocation, OpenstreetmapApi) {
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
				})

		}]);