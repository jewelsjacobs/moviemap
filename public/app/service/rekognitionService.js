'use strict';

/**
 * ReKognition service
 * http://rekognition.com/func/api/?api_key={api_key}&api_secret={api_secret}&jobs={jobs}&urls={urls}
 * API Docs: http://v2.rekognition.com/developer/docs
 */
angular.module('facialUiApp')
  .service('Rekognitionservice', function Rekognitionservice($http, $q, $rootScope, $location, promiseTracker) {
    // AngularJS will instantiate a singleton by calling "new" on this function
		return {
			get: function (jobs, urls) {
				$rootScope.loadingRekog = promiseTracker('loading-rekog');
				var defaultParams = {
					api_key: 'ANkv85Gcu8jTcmRn',
					api_secret: 'Hq7elQKQ7zy7GaHu',
					name_space: 'poc',
					user_id: 'uverse'
				};

				if (arguments.length == 2) {
					// hard coding image url if running on localhost for testing
					urls = $location.host() == 'localhost'
						? 'http://farm3.static.flickr.com/2566/3896283279_0209be7a67.jpg'
						: urls;
					var params = {
						jobs : jobs,
						urls : urls
					}
				} else {
					var params = {
						jobs : jobs
					}
				}

				_.extend(params, defaultParams);

				var config = {
					method: 'GET',
					url: 'http://rekognition.com/func/api/',
					params: params,
					headers: {
						'contentType': false
					},
					tracker: 'loading-rekog'
				};

				var deferred = $q.defer();

				$http(config).
					success(function (data) {
						deferred.resolve(data);
						console.log('Successful rekognitionService response!', data);
					}).
					error(function (data) {
						deferred.reject();
						console.log('Failed rekognitionService response.', data);
					});
				return deferred.promise;
			}
		}
  });
