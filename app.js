
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , api = require('./routes/api');

var app = express();

// all environments
app.set('port', process.env.PORT || 8888);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

if ('production' !== process.env.status) {
  // development only
  app.set('views', __dirname + '/app');
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
} else {
  // production
  app.set('views', __dirname + '/dist');
  app.use(express.static(path.join(__dirname, 'dist')));
}

/**
 * OSM API
 */
app.get('/geocode/:name', api.geocode);

//osm reverse geocode api - get location name from coordinates
//app.get('/reverse/:coordinates', api.reverse);
app.get('/reverse/:lat/:lng', api.reverse);

/**
 * Freebase API
 */
// place
// test: {lat:40.7144,lng:-74.006}
//app.get('/freebase/:coordinates', api.freebase);
app.get('/freebase/:lat/:lng', api.freebase_coords);

app.get('/', routes.index);

module.exports = app;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
