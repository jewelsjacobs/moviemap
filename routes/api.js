var filters = require('../modules/filters.js'),
	osm = require('osmgeocoder'),
	freebase = require('freebase');

exports.freebase = function(req, res) {
	var coordinates = filters.convertCoordinates(req.params.coordinates);
	freebase.place_data({lat:coordinates.lat,lng:coordinates.lng}, {}, function(data){
		res.send(data);
		console.log(data);
	});
};

exports.geocode = function(req, res) {
	var name = req.params.name;
	osm.geocode(name, function(err, response){
		if (err) {
			res.status(500).send(err);
			return;
		}
		res.send(response);
		console.log(response);
	});
};

exports.reverse = function(req, res) {
	var coordinates = filters.convertCoordinates(req.params.coordinates);
	osm.reverse(coordinates.lat, coordinates.lng, function(err, response){
		if (err) {
			res.status(500).send(err);
			return;
		}
		res.send(response);
		console.log(response);
	});
};