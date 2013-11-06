'use strict';

/**
 * Adds Freebase Suggest Search Widget
 * @link {https://developers.google.com/freebase/v1/search-widget}
 */
angular.module('movieMapApp')
		.directive("freebaseSuggest", function () {
			return function (scope, element, attrs) {
				$(element).suggest(scope.$eval(attrs.options));

				if (attrs.onSelect) {
					$(element).bind("fb-select", function(e, data){
            element.controller().getFreebaseSelectData(data);
					});
				};

				if (attrs.selectNew) {
					$(element).bind("fb-select-new", function(e, val) {
						alert("Suggest new: " + val);
					});
				}
			}
	});