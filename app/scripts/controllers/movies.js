'use strict';

/**
 * Creates Map with movie info from search value
 */
angular.module('movieMapApp')
	.controller("MoviesCtrl", ['$scope', 'Freebase', '$stateParams', function ($scope, Freebase, $stateParams) {
      Freebase.one('topic', $stateParams.id).get().then(function(movieTitles){
        $scope.titles = movieTitles.property["/film/film_location/featured_in_films"]["values"];
      });
		}]);