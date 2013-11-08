'use strict';

/**
 * Creates Map
 */
angular.module('movieMapApp')
	.controller("MapCtrl", ['$scope', 'Freebase', 'LeafletApi', '$stateParams', '$state', function ($scope, Freebase, LeafletApi, $stateParams, $state) {

    // set up to share param with child view
    $scope.name = $stateParams.name;

    angular.extend($scope, LeafletApi.setUp($stateParams, $stateParams.name));

    $scope.$on('leafletDirectiveMap.popupopen', function(event){
      $state.go('main.map.movies');
    });

    $scope.$on('leafletDirectiveMap.popupclose', function(event){
      $state.go('main.map');
    });

	}]);