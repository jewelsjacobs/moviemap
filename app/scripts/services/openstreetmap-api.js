'use strict';

/**
 * Openstreetmap service
 */
angular.module('movieMapApp')
	.factory('Openstreetmap', ['Restangular', function (Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('/geocode');
    });
	}]);