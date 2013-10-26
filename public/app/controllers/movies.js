'use strict';

/**
 * Creates Map
 */
angular.module('movieMapApp')
	.controller("MoviesCtrl", [ '$scope', '$routeParams', 'Map', 'FreebaseAPI', function ($scope, $routeParams, Map, FreebaseAPI) {

		$scope.show = 'no';

		var params = {
			query: $routeParams.query,
			filter: "(all type:/film/film_location)"
		}

		FreebaseAPI.get(params)
			.then(
			function (data) {
				console.log(data);
				setUpMap(data);
				$scope.show = 'yes';
			});

		function setUpMap(data) {
			var mapOptions = Map.getMovieLocationMapOptions(data);
			// leaflet options
			angular.extend($scope, mapOptions.leaflet);
			// freebase search options
			angular.extend($scope, Map.getFreebaseOptions);
		}

	}]);