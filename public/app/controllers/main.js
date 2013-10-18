'use strict';

angular.module('facialUiApp')
	.controller('MainCtrl', ['$scope', '$rootScope', 'createDialog', function ($scope, $rootScope, createDialogService) {

		$rootScope.spinnerOpts = {
			top: '20%', // Top position relative to parent in px
			left: '40%' // Left position relative to parent in px
		};

		var footer = '<button class="btn" ng-click="$modalCancel()" ng-disabled="!hideSpinner || disableButton">{{$modalCancelLabel}}</button>' +
			'<button class="btn btn-primary" ng-click="$modalSuccess()">{{$modalSuccessLabel}}</button>';

		createDialogService('../../views/login_modal.html', {
			id: 'complexDialog',
			title: 'Register',
			backdrop: true,
			css: {
				top: '100px',
				left: '20%',
				margin: '0 auto',
				width: '685px',
				height: '425px'
			},
			footerTemplate: footer,
			controller: 'RegisterModalCtrl',
			success: {label: 'Register with Facebook', fn: function(){
				this.registerWithFacebook();
			}
			},
			cancel: {label: 'Register with Webcam', fn: function(){
				this.registerWithWebcam();
			}
			}
		});
	}]);