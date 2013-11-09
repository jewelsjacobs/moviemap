'use strict';

/**
 * Creates Map
 */
angular.module('movieMapApp')
	.controller("MapCtrl", ['$scope', 'Freebase', 'LeafletApi', '$stateParams', '$state', function ($scope, Freebase, LeafletApi, $stateParams, $state) {

    // set up to share param with child view
    $scope.name = $stateParams.name;

    angular.extend($scope, LeafletApi.setUp($stateParams, $stateParams.name));

    Freebase.one('topic', $scope.name).get().then(function(movieTitles){
      if (movieTitles.hasOwnProperty('property')) {
        $scope.titles = movieTitles.property["/film/film_location/featured_in_films"]["values"];
      } else {
        $scope.titles = [{text : "No movies were created in " + $scope.name + " or we just can't find them."}];
      }
    });

    $scope.$on('leafletDirectiveMap.popupopen', function(event){
      $state.go('main.map.movies');
    });

    $scope.$on('leafletDirectiveMap.popupclose', function(event){
      $state.go('main.map');
    });

	}]);