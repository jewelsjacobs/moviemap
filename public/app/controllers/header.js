'use strict';

angular.module('facialUiApp')
  .controller('HeaderCtrl', ['$scope', 'Namefactory', 'Localimageservice', '$rootScope', function ($scope, Namefactory, Localimageservice, $rootScope) {
		$rootScope.$watch('loggedIn', function(value) {
			if (value) {
				$scope.name = Namefactory.firstname + ' ' + Namefactory.lastname;
				$scope.avatar = {
					background:'url(' + Localimageservice.image + ') left 7px no-repeat',
					'background-size': '30px 27px',
					height: '36px',
					width: '29px',
					'margin-right':'-15px'
				}
			} else {
				$scope.name = 'Joe Blow';
				$scope.avatar = {
					background:"url('../images/template/avatar-small.png') left 7px no-repeat",
					'background-size' : '10px 20px',
					height:'20px',
					width:'10px',
					'margin-right':'-15px'
				}
			}
		});
	}]);
