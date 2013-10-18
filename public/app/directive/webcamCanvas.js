'use strict';

angular.module('movieMapApp')
	.directive('webcamCanvas', ['$timeout', '$rootScope', function (timer, $rootScope) {
		return {
			require: ['^webcam'],
			restrict: 'A',
			link: function ($scope, $element, $attrs, $webcam) {
				var _video = null,
					patOpts = {x: 0, y: 0, w: 25, h: 25};

				$webcam[0].onStream = function (opts) {
					timer(function () {
						_video = opts.video;

						$scope.$apply(function () {
							patOpts.w = _video.width;
							patOpts.h = _video.height;
						});
					}, 500)
						.then(timer(function () {
							var controller = $scope.$parent;
							var patCanvas = document.querySelector('#snapshot');
							if (!patCanvas) return;

							patCanvas.width = _video.width;
							patCanvas.height = _video.height;
							var ctxPat = patCanvas.getContext('2d');
							ctxPat.drawImage(_video, 0, 0, _video.width, _video.height);
							var idata = ctxPat.getImageData(patOpts.x, patOpts.y, patOpts.w, patOpts.h);
							ctxPat.putImageData(idata, 0, 0);
							$rootScope.hideSpinner = true;
							controller.canvas = patCanvas;

						}, 500))
				};


			}
		}
	}]);
