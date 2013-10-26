'use strict';

angular.module('movieMapApp')
	.service('Map', function () {

		// map icons
		var local_icons = {
			// leaf
			leaf_icon: L.icon({
				iconUrl: 'images/leaf-green.png',
				shadowUrl: 'images/leaf-shadow.png',
				iconSize: [38, 95], // size of the icon
				shadowSize: [50, 64], // size of the shadow
				iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
				shadowAnchor: [4, 62],  // the same for the shadow
				popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
			})
		};

		return {
			getMapOptions: function (data) {
				return {
					leaflet: {
						icons: local_icons,
						geo: {
							lat: Math.floor(data.coords.latitude),
							lng: Math.floor(data.coords.longitude),
							zoom: 8
						},
						maxZoom: 18,
						markers: {
							m1: {
								lat: Math.floor(data.coords.latitude),
								lng: Math.floor(data.coords.longitude),
								message: "I'm a static marker",
								icon: local_icons.leaf_icon
							}
						},
						tileLayer: 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
						defaults: {
							scrollWheelZoom: false
						}
					},
					freebase: {
						key: "AIzaSyCB6HFuNF-E9qTHW9Ba39NgkpHx701gr1Q",
						filter: '(all type:/film/film_location)',
						show_id: true
					}
				}
			},
			getFreebaseOptions: {
				freebase: {
					key: "AIzaSyCB6HFuNF-E9qTHW9Ba39NgkpHx701gr1Q",
					filter: '(all type:/film/film_location)',
					show_id: true
				}
			}
		};
	});