'use strict';

/**
 * Creates Map with movie info from search value
 */
angular.module('movieMapApp')
	.controller("MoviesCtrl", [
		'$scope',
		'$routeParams',
		'Location',
		'OpenstreetmapApi',
		'LeafletApi',
		'FilmApi',
		'$http',
		'$compile',
		function ($scope, $routeParams, Location, OpenstreetmapApi, LeafletApi, FilmApi, $http, $compile) {
			// hide map
			$scope.show = 'no';
			Location.results.name = $routeParams.query;

			OpenstreetmapApi.getLocationPosition(Location.results.name).
				then(function(locationData){
					var position = {
						lat: parseFloat(locationData[0].lat),
						lng: parseFloat(locationData[0].lon)
					};

					Location.results.position = position;

					FilmApi.createFimDetails();
					$http(FilmApi.TEMPLATE).
						success(function (r) {
							angular.extend($scope, LeafletApi.setUp(Location.results.position, $compile(r)($scope)));
							$scope.show = 'yes';
					});
				});
		}]);