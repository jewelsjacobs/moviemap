'use strict';

/**
 * Helper methods
 */
angular.module('movieMapApp')
	.factory('HttpPromise', [
		'$http',
		'$q', function ($http, $q) {
		return {
			getResponse: function (url, config, method) {
				var deferred = $q.defer();

				switch (method) {
					case 'jsonp' :
						$http.jsonp(url, config).
							success(function (data) {
								if (data.error) {
									deferred.reject();
									console.log('Failed api response.', data);
								} else {
									deferred.resolve(data);
									console.log('Successful api response!', data);
								}
							}).
							error(function (data) {
								deferred.reject();
								console.log('Failed api response.', data);
							});
						break;
					case 'get' :
						$http.get(url, config).
							success(function (data) {
								if (data.error) {
									deferred.reject();
									console.log('Failed api response.', data);
								} else {
									deferred.resolve(data);
									console.log('Successful api response!', data);
								}
							}).
							error(function (data) {
								deferred.reject();
								console.log('Failed api response.', data);
							});
						break;
				}

				return deferred.promise;
			}
		}
	}]);