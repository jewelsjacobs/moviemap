var osm = require('osmgeocoder'),
	freebase = require('freebase');

/**
 *
 * Mock data:
 * { city:
   { mid: '/m/02_286',
     id: '/en/new_york',
     name: 'New York City',
     notable: { name: 'City/Town/Village', id: '/location/citytown' },
     lang: 'en',
     score: 39.065792 },
  country: { id: '/en/united_states', name: 'United States of America' },
  province: { id: '/en/new_york_state', name: 'New York' },
  timezone: null }

 * @param req
 * @param res
 */
exports.freebase_coords = function(req, res) {
	freebase.place_data({lat:req.params.lat,lng:req.params.lng}, {}, function(data){
		res.send(data);
		console.log(data);
	});
};

exports.freebase_topic = function(req, res) {
  freebase.topic(req.params.name, {filter:"/film/film_location/featured_in_films"}, function(data){
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