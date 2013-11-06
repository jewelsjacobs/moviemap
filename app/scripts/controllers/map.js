'use strict';

/**
 * Creates Map
 */
angular.module('movieMapApp')
	.controller("MapCtrl", ['$scope', 'Freebase', 'LeafletApi', '$stateParams', '$state', function ($scope, Freebase, LeafletApi, $stateParams, $state) {

    angular.extend($scope, LeafletApi.setUp($stateParams, $stateParams.name));

    $scope.$on('leafletDirectiveMap.popupopen', function(event){
      $state.go('main.map.movies', {id: $stateParams.name});
    });

    $scope.$on('leafletDirectiveMap.popupclose', function(event){
      $state.go('main.map');
    });

	}]);