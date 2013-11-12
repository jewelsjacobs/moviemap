'use strict';

/**
 * Global Controller
 */
angular.module('movieMapApp')
  .controller("MainCtrl", ['$scope', 'Freebase', 'geolocation', '$state', 'Openstreetmap', '$localStorage', '$rootScope', function ($scope, Freebase, geolocation, $state, Openstreetmap, $localStorage, $rootScope) {

    $rootScope.loading = true;

    $scope.$storage = $localStorage;
    $scope.spinnerOpts = {
      lines: 13, // The number of lines to draw
      length: 20, // The length of each line
      width: 10, // The line thickness
      radius: 30, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };

    $scope.spinnerStyle = {
      position: 'absolute',
      top: '40%',
      left: '50%',
      'z-index': 1
    };

    geolocation.getLocation().then(
      function (locationData) {
        var position = {
          lat: locationData.coords.latitude,
          lng: locationData.coords.longitude
        };

        Freebase.one('lat', position.lat).one('lng', position.lng).get().then(function (nameData) {
          $rootScope.loading = false;
          var positionInfo = {lat: position.lat, lng: position.lng, name: nameData.city.name};
          $scope.$storage.local = JSON.stringify(positionInfo);
          $state.go('main.map', positionInfo);
        });
      })

    $scope.options = {
      key: 'AIzaSyBg-XDekBtpbm2Gmksk8xcunU0ezk-q8g8',
      filter: '(all type:/film/film_location)',
      zIndex: 999999999,
      flyout: false,
      css_prefix: "mm-"
    };

    this.getFreebaseSelectData = function (data) {
      $rootScope.loading = true;
      Openstreetmap.one('name', data.name).get().then(function (positionData) {
        Freebase.one('lat', positionData[0].lat).one('lng', positionData[0].lon).get().then(function (nameData) {
          $rootScope.loading = false;
          $state.go('main.map', {lat: positionData[0].lat, lng: positionData[0].lon, name: nameData.city.name});
        });
      });
    }

    $scope.myLocation = function () {
      $rootScope.loading = true;
      $state.go('main.map', JSON.parse($scope.$storage.local));
    }

  }]);