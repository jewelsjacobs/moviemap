module.exports = function(config) {
  config.set({
    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/jquery-migrate/jquery-migrate.js',
      'app/plugins/freebase/suggest.min.js',
      'app/plugins/leaflet/leaflet.js',
      'app/bower_components/bootstrap/dist/js/bootstrap.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/spin.js/dist/spin.js',
      'app/bower_components/angular-spinner/angular-spinner.js',
      'app/bower_components/angularjs-geolocation/src/geolocation.js',
      'app/bower_components/Leaflet.awesome-markers/dist/leaflet.awesome-markers.js',
      'app/bower_components/angular-leaflet/src/angular-leaflet-directive.js',
      'app/scripts/**/*.js',
      'app/scripts/*.js',
      // 'test/node/**/*.js',
      'test/unit/**/*.js'
    ],
    basePath: '../',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
    autoWatch: false,
    singleRun: true,
    colors: true,
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]
  });
};
