'use strict';

angular.module('facialUiApp')
	.controller('RecognizeCtrl', ['$scope', '$state', '$rootScope', '$filter', '$location', 'Statusservice', 'Rekognitionservice', 'Localimageservice', 'Namefactory', 'createDialog', function ($scope, $state, $rootScope, $filter, $location, Statusservice, Rekognitionservice, Localimageservice, Namefactory, createDialogService) {

		$rootScope.status.message = 'Please look into the device camera.';
		$rootScope.status.style = 'info';

		createDialogService('../../views/recognize_modal.html', {
			id: 'complexDialog',
			title: 'Recognizing . . .',
			backdrop: true,
			css: {
				top: '100px',
				left: '20%',
				margin: '0 auto',
				width: '685px',
				height: '425px'
			},
			footerTemplate: "<div ng-model='status' class='alert alert-block alert-{{ status.style }}'>{{ status.message }}</div>"
		});

//		Statusservice.set();

		$rootScope.spinnerOpts = {
			lines: 13, // The number of lines to draw
			length: 39, // The length of each line
			width: 14, // The line thickness
			radius: 57, // The radius of the inner circle
			top: '14%', // Top position relative to parent in px
			left: '170%' // Left position relative to parent in px
		};

		$rootScope.status = {
			status: 'default',
			message: 'Please look into the device camera.',
			style: 'info'
		};

		var port = _.indexOf($location.host, 'localhost') ? ':' + $location.port() : '';
		var randNum = Math.floor((Math.random() * 100) + 1);
		var randImageName = 'recog_image_' + randNum;

		Localimageservice.image = $location.protocol() + '://' + $location.host()
			+ port + '/camera-images/'
			+ randImageName + '.png';

		$rootScope.$watch('hideSpinner', function(value){
			if (value) {
				var $modalScope = $scope.$$nextSibling.$$childTail;
				Localimageservice.save($modalScope.canvas, randImageName)
					.then(
					function () {
						console.log('Image saved.');
						Rekognitionservice.get('face_part', Localimageservice.image)
							.then(
							function (detectResponse) {
								if (_.has(detectResponse, 'face_detection')
									&& detectResponse['face_detection'][0]['confidence'] != 0) {
									console.log('Image is a face');
									Rekognitionservice.get('face_recognize', Localimageservice.image)
										.then(
										function (recognizeResponse) {
											if (_.has(recognizeResponse, 'face_detection')
												&& recognizeResponse['face_detection'].length > 0) {
												var matches = recognizeResponse.face_detection[0]['matches'];
												_.map(matches, function (match) {
													match.score = parseFloat(match.score);
													match.tag = $filter('toTitleCase')(match.tag.replace("_", " "));
												});
												Namefactory.name = matches[0]['tag'];
												$rootScope.hideSpinner = true;
												$rootScope.status.message = 'Welcome, ' + Namefactory.name + '! Logging in . . ';
												$rootScope.status.style = 'success';
												$state.go('index.loggedin');
											} else {
												$rootScope.status.status = 'register';
												$rootScope.hideSpinner = true;
												$rootScope.status.message = 'You do not have an account yet. Redirecting to registration . . ';
												$rootScope.status.style = 'info';
												$state.go('index.register');
											}
										})
								}
								else {
									$rootScope.status.status = 'notface';
									$rootScope.hideSpinner = true;
									$rootScope.status.message = 'No face detected. Please look into the device camera.';
									$rootScope.status.style = 'error';
									console.log('Image is not a face');
								}
							})
					});
			}
		});

	}])