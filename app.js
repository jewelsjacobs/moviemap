
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
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

if ('production' !== process.env.status) {
  // development only
  app.set('views', __dirname + '/app');
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(function(req, res) {
    res.render('index.html', { title: 'MovieMap' });
  });
  app.use(express.errorHandler());
} else {
  // production
  app.set('views', __dirname + '/dist');
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(function(req, res) {
    res.render('index.html', { title: 'MovieMap' });
  });
}

/**
 * OSM API
 */
app.get('/geocode/name/:name', api.geocode);

app.get('/reverse/:lat/:lng', api.reverse);

/**
 * Freebase API
 */
// test: {lat:40.7144,lng:-74.006}
app.get('/freebase/lat/:lat/lng/:lng', api.freebase_coords);

app.get('/freebase/topic/:name', api.freebase_topic);

app.get('/', routes.index);

module.exports = app;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
