'use strict';

/**
 * Leaflet Map Services
 */
angular.module('movieMapApp')
	.service('LeafletApi', function () {

		// Creates a blue marker with the film icon
		var icons = {
			movie_icon: L.AwesomeMarkers.icon({
				icon: 'film',
				markerColor: 'blue',
				iconSize: [38, 95], // size of the icon
				shadowSize: [50, 64], // size of the shadow
				iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
				shadowAnchor: [4, 62],  // the same for the shadow
				popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
			})
		};

		return {
			setUp: function (position, message) {
				return {
					icons: icons,
					geo: {
						lat: position.lat,
						lng: position.lng,
						zoom: 8
					},
					markers: {
						m1: {
							lat: position.lat,
							lng: position.lng,
							message: message,
							icon: icons.movie_icon
						}
					},
					tileLayer: 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
					defaults: {
						scrollWheelZoom: false
					}
				};
			}
		};
	});