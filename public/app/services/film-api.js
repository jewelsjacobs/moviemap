'use strict';

/**
 * Film content methods
 */
angular.module('movieMapApp')
	.factory('FilmApi', [
		'Film',
		'FreebaseApi',
		'Location',
		function (Film, FreebaseApi, Location) {
			var FILTER_TYPE = "/film/film_location/featured_in_films";
			return {
				createFimDetails: function () {
					var details = [];
					FreebaseApi.getFilmTitleData(Location.results.name).
						then(
						/**
						 *
						 * @param filmData
						 * @returns {Array}
						 */
						function (filmData) {
							angular.forEach(filmData.result[0][FILTER_TYPE], function (title) {
								FreebaseApi.getFilmDetails(title).then(function(detail){
									FreebaseApi.getFilmTopic(detail.result[0].id).then(function(topic){
										angular.extend(detail, topic);
										details.push(detail);
									})
								})
							});
							return details;
						});
				}
			}
		}]);