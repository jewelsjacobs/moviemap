'use strict';

/**
 * Horrible controller with too much stuff shoved in it.
 * I don't have time to make this decent.
 */

angular.module('movieMapApp')
	.controller('RegisterModalCtrl', ['$scope', '$state', '$timeout', '$location', 'Statusservice', 'Facebook', 'Rekognitionservice', 'Namefactory', 'Localimageservice', '$rootScope', function ($scope, $state, $timeout, $location, Statusservice, Facebook, Rekognitionservice, Namefactory, Localimageservice, $rootScope) {

		$scope.formScope = this.$$childTail;

		$rootScope.spinnerOpts = {
			lines: 13, // The number of lines to draw
			length: 20, // The length of each line
			width: 10, // The line thickness
			radius: 30 // The radius of the inner circle
		}

		$rootScope.status = {
			status: 'default',
			message: 'Please look into the device camera.',
			style: 'info'
		}

		$scope.registerWithWebcam = function () {
			var port = _.indexOf($location.host, 'localhost') ? ':' + $location.port() : '';
			var $modalScope = this.$$childTail;
			if ($modalScope.webcamuser.$valid) {
				Namefactory.firstname = $modalScope.webcamuser.firstname.$modelValue;
				Namefactory.lastname = $modalScope.webcamuser.lastname.$modelValue;
				var name = $modalScope.webcamuser.firstname.$modelValue.toLowerCase() +
					'_' +
					$modalScope.webcamuser.lastname.$modelValue.toLowerCase();
				Localimageservice.image = $location.protocol() +
					'://' +
					$location.host() +
					port +
					'/camera-images/' +
					name +
					'.png';
				Localimageservice.save($modalScope.canvas, name)
					.then(
					function (imageResponse) {
						console.log('Image saved.');
						console.log(imageResponse);
						Rekognitionservice.get('face_part', Localimageservice.image)
							.then(
							function (detectResponse) {
								if (_.has(detectResponse, 'face_detection')
									&& detectResponse['face_detection']['confidence'] == 1) {
								console.log(detectResponse);
								$state.go('index.loggedin');
								Rekognitionservice.get('face_add_[' + name + ']', Localimageservice.image)
									.then(
									function (addResponse) {
										console.log(addResponse);
										console.log('Face image has been added');
										Rekognitionservice.get('face_train')
											.then(
											function (trainresponse) {
												console.log(trainresponse);
												console.log('Image is a face');
												$rootScope.hideSpinner = true;
												$rootScope.status.message = 'Welcome, ' + Namefactory.name + '! Logging in . . ';
												$rootScope.status.style = 'success';
												console.log('Face image has been trained');
											})
									});
								}
								else {
									$rootScope.status.status = 'noface';
									$rootScope.status.message = 'No face detected. Please look into the device camera.';
									$rootScope.status.style = 'error';
									console.log('Image is not a face');
									$scope.$modalClose = function(){return};
								}
							})
					})
			};
		};

		$scope.registerWithFacebook = function () {
			Facebook.getLoginStatus(function (response) {
				if (response.status == 'connected') {
					$scope.logged = true;
					$scope.me();
					$rootScope.loggedIn = true;
				}
				else
					$scope.login();
			});
		};

		if ($location.host() == 'localhost') {
			$scope.firstname = 'Local';
			$scope.lastname = 'Test';
		}

		/**
		 * Facebook stuff
		 * @type {{}}
		 */
			// Define user empty data :/
		$scope.user = {};
		// Defining user logged status
		$scope.logged = false;
		// And some fancy flags to display messages upon user status change
		$scope.byebye = false;
		$scope.salutation = false;
		/**
		 * IntentLogin
		 */
		$scope.IntentLogin = function () {
			Facebook.getLoginStatus(function (response) {
				if (response.status == 'connected') {
					$scope.logged = true;
					$scope.me();
				}
				else
					$scope.login();
			});
		};
		/**
		 * Login
		 */
		$scope.login = function () {
			Facebook.login(function (response) {
				if (response.status == 'connected') {
					$scope.logged = true;
					$scope.me();
				}

			});
		};
		/**
		 * me
		 */
		$scope.me = function () {
			Facebook.api('/me', function (response) {
				/**
				 * Using $scope.$apply since this happens outside angular framework.
				 */
				$scope.$apply(function () {
					$scope.user = response;
				});

			});
		};
		/**
		 * Logout
		 */
		$scope.logout = function () {
			Facebook.logout(function () {
				$scope.$apply(function () {
					$scope.user = {};
					$scope.logged = false;
				});
			});
		}
		/**
		 * Taking approach of Events :D
		 */
		$scope.$on('Facebook:statusChange', function (ev, data) {
			console.log('Status: ', data);
			if (data.status == 'connected') {
				$scope.$apply(function () {
					$scope.salutation = true;
					$scope.byebye = false;
				});
			} else {
				$scope.$apply(function () {
					$scope.salutation = false;
					$scope.byebye = true;

					// Dismiss byebye message after two seconds
					$timeout(function () {
						$scope.byebye = false;
					}, 2000)
				});
			}
		});

	}]);
