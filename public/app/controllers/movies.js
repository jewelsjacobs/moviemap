'use strict';

/**
 * Creates Map
 */
angular.module('movieMapApp')
	.controller("MoviesCtrl", [
		'$scope',
		'$routeParams',
		'LeafletApi',
		'FreebaseApi',
		'Film',
		'OpenstreetmapApi',
		function ($scope, $routeParams, LeafletApi, FreebaseApi, Film, OpenstreetmapApi) {

		$scope.show = 'no';

		FreebaseApi.getFilmTitleData($routeParams.query, "(all type:/film/film_location/featured_in_films)").
			then(function (filmData) {
				console.log(filmData.result["/film/film_location/featured_in_films"]);
				Film.results.titles = filmData.result["/film/film_location/featured_in_films"];
				OpenstreetmapApi.getLocation($routeParams.query)
					.then(function(locationData){
						var position = {
							lat: parseFloat(locationData[0].lat),
							lng: parseFloat(locationData[0].lon)
						};
						console.log(position);
						Film.results.position = position;
						var message = Film.results.titles.toString();
						angular.extend($scope, LeafletApi.setUp(position, message));
						$scope.show = 'yes';
					});

			});

	}]);