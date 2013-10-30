'use strict';

/**
 * Loads
 */
angular.module('movieMapApp')
	.controller("LoadCtrl", [
		'$scope',
		'FreebaseApi',
		'geolocation',
		function ($scope, FreebaseApi, geolocation) {
			// hide map
			$scope.show = 'no';
			Location.results.name = $routeParams.query;

			$scope.details = {};

			OpenstreetmapApi.getLocationPosition(Location.results.name).
				then(
				/**
				 * Assigns location position to Location factory
				 * @param locationData data with location position
				 */
					function(locationData){
					var position = {
						lat: parseFloat(locationData[0].lat),
						lng: parseFloat(locationData[0].lon)
					};

					Location.results.position = position;

					$scope.details = FilmApi.createFimDetails();
				});

			$scope.$watch("details", function(details){
				Film.results.details = details;
				var popUpContent = document.querySelector("#popUp");
				var htmlString = angular.element(popUpContent).html();
				angular.extend($scope, LeafletApi.setUp(Location.results.position, htmlString));
				$scope.show = 'yes';
			});
		}]);