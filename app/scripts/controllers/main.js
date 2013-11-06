'use strict';

/**
 * Global Controller
 */
angular.module('movieMapApp')
  .controller("MainCtrl", ['$scope', 'Search', 'Freebase', 'geolocation', '$state', 'Openstreetmap', function ($scope, Search, Freebase, geolocation, $state, Openstreetmap) {

      $scope.master = {};

      $scope.update = function (search) {
        $scope.master = angular.copy(search);
      };

      $scope.options = Search.options;

      this.getFreebaseSelectData = function (data) {
        Search.data = data;

        Openstreetmap.one('name', data.name).get().then(function(positionData){
          Freebase.one('lat', positionData[0].lat).one('lng', positionData[0].lon).get().then(function(nameData){
            $state.go('main.map', {lat: positionData[0].lat, lng: positionData[0].lon, name: nameData.city.name});
          });
        });
      }

      geolocation.getLocation().then(
        function (locationData) {
        var position = {
          lat: locationData.coords.latitude,
          lng: locationData.coords.longitude
        };

          Freebase.one('lat', position.lat).one('lng', position.lng).get().then(function(nameData){
            $state.go('main.map', {lat: position.lat, lng: position.lng, name: nameData.city.name});
          });
      })

  }]);