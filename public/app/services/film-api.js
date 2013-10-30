'use strict';

/**
 * Film content methods
 */
angular.module('movieMapApp')
	.factory('FilmApi', [
		'Film',
		'FreebaseApi',
		'Location',
		'$q',
		'$timeout',
		function (Film, FreebaseApi, Location, $q, $timeout) {
			var FILTER_TYPE = "/film/film_location/featured_in_films";
			return {
				createFimDetails: function () {
					Film.results.details = [];
					FreebaseApi.getFilmTitleData(Location.results.name).then(
						/**
						 *
						 * @param filmData
						 * @returns {Array}
						 */
						function (filmData) {
							angular.forEach(filmData.result[0][FILTER_TYPE], function(title) {
								$timeout(function(){
									FreebaseApi.getFilmDetails(title).then(
										/**
										 * Get Film Detail Data
										 * @param detail
										 */
											function(detail){
											Film.results.details.push(detail);
//											FreebaseApi.getFilmTopic(detail.result[0].id).then(
//												/**
//												 * Get Film Topic Data
//												 * @param topic
//												 */
//													function(topic){
//													angular.extend(Film.results.detail, topic);
//													Film.results.details.push(Film.results.detail);
//												})
										});
								}, 100);
							});

							$timeout(function(){
								return Film.results.details;
							}, filmData.result[0][FILTER_TYPE].length * 1000);
						});

				}
			}
		}]);