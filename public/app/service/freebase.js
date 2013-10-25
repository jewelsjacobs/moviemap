'use strict';

/**
 * Freebase service
 * API Docs: https://developers.google.com/freebase/
 */
angular.module('movieMapApp')
	.service('Freebase', function(Restangular) {
		return Restangular.withConfig(function(RestangularConfigurer) {
			RestangularConfigurer.setBaseUrl('https://www.googleapis.com/freebase/v1/search');
			var defaultParams = {
				apiKey: 'bmvdmajhhzjgqdfkuse3g8zq',
				cid: '55505',
				locale: 'en_US',
				numberOfResults: '10',
				supplierCacheTolerance: 'MED_ENHANCED',
				currencyCode: 'USD'
			};
			RestangularConfigurer.setDefaultRequestParams(defaultParams);
		});
	});