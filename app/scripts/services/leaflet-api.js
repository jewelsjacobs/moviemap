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
        prefix: 'fa',
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
						lat: parseFloat(position.lat),
						lng: parseFloat(position.lng),
						zoom: 8
					},
          events: {
            map: {
              enable: ['popupopen', 'popupclose'],
              logic: 'emit'
            }
          },
					markers: {
						m1: {
              lat: parseFloat(position.lat),
              lng: parseFloat(position.lng),
							icon: icons.movie_icon,
              message: message
						}
					},
          defaults: {
            tileLayer: 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
            scrollWheelZoom: false
          }
				};
			}
		};
	});