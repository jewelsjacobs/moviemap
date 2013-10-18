/**
 * Created by jjacobs on 9/26/13.
 */

angular.module('facialUiApp')
	.service('Statusservice', function Statusservice($rootScope, Namefactory) {
		return {
			set: function () {
				$rootScope.$watch('status', function (value) {
					switch (value.status) {
						case 'recognized':
							$rootScope.hideSpinner = true;
							$rootScope.status.message = 'Welcome, ' + Namefactory.name + '! Logging in . . ';
							$rootScope.status.style = 'success';
							break;
						case 'register':
							$rootScope.hideSpinner = true;
							$rootScope.status.message = 'You do not have an account yet. Redirecting to registration . . ';
							$rootScope.status.style = 'info';
							break;
						case 'notface':
							$rootScope.hideSpinner = true;
							$rootScope.status.message = 'No face detected. Please look into the device camera.';
							$rootScope.status.style = 'error';
							break;
						default:
							$rootScope.status.message = 'Please look into the device camera.';
							$rootScope.status.style = 'info';
					}
				});
			}
		}
	});