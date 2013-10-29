'use strict';

/**
 * Film content methods
 */
angular.module('movieMapApp')
	.factory('FilmApi', [
		'Film',
		'FreebaseApi',
		'Location',
		'$filter', function (Film, FreebaseApi, Location, $filter) {
			var FILTER_TYPE = "/film/film_location/featured_in_films";

			return {
				TEMPLATE : "../templates/popup-content.html",
				createFimDetails: function () {
					FreebaseApi.getFilmTitleData(Location.results.name).
						then(function (filmData) {
							Film.results.titles = filmData.result[FILTER_TYPE];
							var details = [];
							angular.forEach(Film.results.titles, function (title) {
								details.push(FreebaseApi.getFilmDetails($filter('titles')(title)));
							});
							return details;
						});
				}
			}
		}]);