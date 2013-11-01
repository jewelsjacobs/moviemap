var filters = require('../modules/filters.js'),
	osm = require('osmgeocoder'),
	freebase = require('freebase');

exports.freebase = function(req, res) {
	freebase.place_data({lat:req.params.lat,lng:req.params.lng}, {}, function(data){
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
	osm.reverse(req.params.lat, req.params.lng, function(err, response){
		if (err) {
			res.status(500).send(err);
			return;
		}
		res.send(response);
		console.log(response);
	});
};