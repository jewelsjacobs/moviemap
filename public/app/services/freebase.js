'use strict';

/**
 * Freebase service
 * API Docs: https://developers.google.com/freebase/
 */
angular.module('movieMapApp')
	.service('FreebaseAPI', [ '$http', '$q', '$rootScope', '$location', 'promiseTracker', function ($http, $q, $rootScope, $location, promiseTracker) {
		return {
			get: function (params) {
				$rootScope.loading = promiseTracker('loading');

				var config = {
					method: 'GET',
					url: 'https://www.googleapis.com/freebase/v1/search',
					params: params,
					headers: {
						'contentType': false
					},
					tracker: 'loading'
				};

				var deferred = $q.defer();

				$http(config).
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