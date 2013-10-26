'use strict';

/**
 * Freebase service
 * API Docs: https://developers.google.com/freebase/
 */
angular.module('movieMapApp')
	.service('FreebaseAPI', [ '$http', '$q', '$rootScope', '$location', 'promiseTracker', function ($http, $q, $rootScope, $location, promiseTracker) {
		return {
			get: function (query) {
				$rootScope.loading = promiseTracker('loading');

				var API_KEY = 'AIzaSyCB6HFuNF-E9qTHW9Ba39NgkpHx701gr1Q';
				var FREEBASE_API_URL = 'https://www.googleapis.com/freebase/v1/search';
				var FREEBASE_API_MAX_RESULTS = 30;

				var config = {
					params: {
						query: query,
						key: API_KEY,
						limit: FREEBASE_API_MAX_RESULTS,
						callback: 'JSON_CALLBACK'
					}
				};

				var deferred = $q.defer();

				$http.jsonp(FREEBASE_API_URL, config).
					success(function (data) {
						deferred.resolve(data);
						console.log('Successful FreebaseAPI response!', data);
					}).
					error(function (data) {
						deferred.reject();
						console.log('Failed FreebaseAPI response.', data);
					});
				return deferred.promise;
			}
		}
	}]);