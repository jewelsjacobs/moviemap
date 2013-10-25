'use strict';

angular.module('movieMapApp', ['ngRoute', 'restangular','leaflet-directive', 'angularSpinner', 'ngSanitize', 'angularSpinner', 'ajoslin.promise-tracker', 'geolocation'])
	.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$routeProvider.
			when('/', {
				templateUrl: 'views/map.html',
				controller: 'MainCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
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
