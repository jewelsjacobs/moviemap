'use strict';

/**
 * Creates Map
 */
angular.module('movieMapApp')
	.controller("MapCtrl", ['$scope', 'Freebase', '$stateParams', '$timeout', '$rootScope', function ($scope, Freebase, $stateParams, $timeout, $rootScope) {

    $scope.name = $stateParams.name;

    $rootScope.loading = false;

    // Creates a blue marker with the film icon
    var icons = {
      movie_icon: L.AwesomeMarkers.icon({
        icon: 'film',
        prefix: 'fa',
        markerColor: 'blue',
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      })
    };

    angular.extend($scope, {
      icons: icons,
      geo: {
        lat: parseFloat($stateParams.lat),
        lng: parseFloat($stateParams.lng),
        zoom: 8
      },
      markers: {
        m1: {
          lat: parseFloat($stateParams.lat),
          lng: parseFloat($stateParams.lng),
          icon: icons.movie_icon
        }
      },
      defaults: {
        tileLayer: 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
        scrollWheelZoom: false
      }
    });

    $scope.movieTitles = 'not loaded';

    Freebase.one('topic', $scope.name).get().then(function(movieTitles){
      if (movieTitles.hasOwnProperty('property')) {
        $scope.titles = movieTitles.property["/film/film_location/featured_in_films"]["values"];
      } else {
        $scope.titles = [{text : "No movies were created in " + $scope.name + " or we just can't find them."}];
      }
      $timeout(function () {
        $scope.movieTitles = 'loaded';
        var popUpContent = document.querySelector("#popup");
        $scope.markers.m1.message = angular.element(popUpContent).html();
      }, 100);
    });

	}]);