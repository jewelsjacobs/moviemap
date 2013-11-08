'use strict';

/**
 * Creates Map with movie info from search value
 */
angular.module('movieMapApp')
	.controller("MoviesCtrl", ['$scope', 'Freebase', '$stateParams', function ($scope, Freebase) {
      Freebase.one('topic', $scope.name).get().then(function(movieTitles){
        if (movieTitles.hasOwnProperty('property')) {
          $scope.titles = movieTitles.property["/film/film_location/featured_in_films"]["values"];
        } else {
          $scope.titles = [{text : "No movies were created in " + $scope.name + " or we just can't find them."}];
        }
      });
		}]);