'use strict';

angular.module('facialUiApp', ['ngRoute', 'ui.router', 'angularSpinner', 'ngSanitize', 'angularSpinner', 'ajoslin.promise-tracker'])
	.config(['$stateProvider', '$urlRouterProvider', '$routeProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $routeProvider, $locationProvider, $httpProvider) {
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('index', {
				views: {
					"header": {
						templateUrl: "views/header.html",
						controller: 'HeaderCtrl'
					},
					"main": {
						templateUrl: "views/main.html",
						controller: 'RecognizeCtrl'
					},
					"footer": {
						templateUrl: "views/footer.html"
					}
				},
				url: "/"
			})
			.state('index.register', {
				"main": {
					templateUrl: "views/main.html",
					controller: 'MainCtrl'
				}
			})
			.state('index.loggedin', {
				templateUrl: "views/video_wall.html"
			});

		$locationProvider.html5Mode(true);

		var myAppId = '532226223524802';
//		var myAppSecret = '671fb6fadec43200d40dc4bcf1b543a7';

		// You can set appId with setApp method
		// FacebookProvider.setAppId('myAppId');

  }]).
	run(function($rootScope) {
		$rootScope.hideSpinner = false;
		$rootScope.loggedIn = false;
		$rootScope.disableButton = false;
		$rootScope.status = {
			status: '',
			message: '',
			style: ''
		};
		$rootScope.spinnerOpts = {
			corners: 1, // Corner roundness (0..1)
			rotate: 0, // The rotation offset
			direction: 1, // 1: clockwise, -1: counterclockwise
			color: '#000', // #rgb or #rrggbb or array of colors
			speed: 0.8, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: true, // Whether to render a shadow
			hwaccel: true, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 1 // The z-index (defaults to 2000000000)
		};
	});
