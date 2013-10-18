'use strict';

angular.module('facialUiApp')
  .service('Localimageservice', function Localimageservice($http, $rootScope, $location, $q, promiseTracker) {
    // AngularJS will instantiate a singleton by calling "new" on this function
		return {
			image: '',
			save: function (canvas, name) {
				$rootScope.savingImage = promiseTracker('saving-image');
				var dataURL = encodeURIComponent(canvas.toDataURL("image/png"));
				var url = "/camera/" + name + "/";

				var config = {
					method: 'POST',
					url: url,
					data: $.param({ image: dataURL }),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					tracker: 'saving-image'
				};

				var deferred = $q.defer();

				$http(config).
					success(function (data) {
						deferred.resolve(data);
						console.log('Successful Localimageservice response!', data);
					}).
					error(function (data) {
						deferred.reject(data);
						console.log('Failed Localimageservice response.', data);
					});
				return deferred.promise;
			}
		}
  });
