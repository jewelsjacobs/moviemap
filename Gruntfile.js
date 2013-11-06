// Generated on 2013-07-31 using generator-angular 0.3.1
'use strict';

// no more needed, see grunt-express doc
//var LIVERELOAD_PORT = 35729;
//var lrSnippet = require('express-livereload')({ port: LIVERELOAD_PORT });
//var mountFolder = function (express, dir) {
//  return express.static(require('path').resolve(dir));
//};

var path = require('path');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
	require('load-grunt-tasks')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    shell: {
      options: {
        stdout: true
      },
      selenium: {
        command: './selenium/start',
        options: {
          stdout: false,
          async: true
        }
      },
      protractor_install: {
        command: 'node ./node_modules/protractor/bin/install_selenium_standalone'
      },
      npm_install: {
        command: 'npm install'
      },
      bower_install: {
        command: 'node ./node_modules/bower/bin/bower install'
      }
    },
	  autoprefixer: {
		  options: ['last 1 version'],
		  dist: {
			  files: [{
				  expand: true,
				  cwd: '.tmp/styles/',
				  src: '{,*/}*.css',
				  dest: '.tmp/styles/'
			  }]
		  }
	  },
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
	    less: {
		    files: ['<%= yeoman.app %>/styles/**/*.less'],
		    tasks: ['less']
	    }
//      protractor: {
//        files: ['app/scripts/**/*.js','test/e2e/**/*.js'],
//        tasks: ['protractor:auto']
//      }
    },
    express: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          server: path.resolve('./app.js'),
          livereload: true,
          serverreload: false,
          bases: [path.resolve('./.tmp'), path.resolve(__dirname, yeomanConfig.app)]
        }
      },
      test: {
        options: {
          port: 9999,
          server: path.resolve('./app.js'),
          bases: [path.resolve('./.tmp'), path.resolve(__dirname, 'test'), path.resolve(__dirname, yeomanConfig.app)]
        }
      },
      coverage: {
        options: {
          port: 5555,
          keepalive: true,
          bases: ['coverage/']
        }
      },
      dist: {
        options: {
          server: path.resolve('./app.js'),
          bases: path.resolve(__dirname, yeomanConfig.dist)
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      },
      test: {
        url: 'http://localhost:<%= express.test.options.port %>'
      },
      coverage: {
        url: 'http://localhost:<%= express.coverage.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '<%= yeoman.app %>/styles/*.css',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%= yeoman.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '*.html', 'views/*.html',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
	    styles: {
		    expand: true,
		    cwd: '<%= yeoman.app %>/styles',
		    dest: '.tmp/styles/',
		    src: '{,*/}*.css'
	    }
    },
	  less: {
		  options: {
			  paths: ['app/components']
			  //dumpLineNumbers: true
		  },
		  dist: {
			  files: [{
				  expand: true,     // Enable dynamic expansion.
				  cwd: '<%= yeoman.app %>/styles/',      // Src matches are relative to this path.
				  src: ['**/*.less'], // Actual pattern(s) to match.
				  dest: '.tmp/styles/',   // Destination path prefix.
				  ext: '.css'  // Dest filepaths will have this extension.
			  }]
		  },
      dev: {
        files: [{
          expand: true,     // Enable dynamic expansion.
          cwd: '<%= yeoman.app %>/styles/',      // Src matches are relative to this path.
          src: ['**/*.less'], // Actual pattern(s) to match.
          dest: '<%= yeoman.app %>/styles/',   // Destination path prefix.
          ext: '.css'  // Dest filepaths will have this extension.
        }]
      },
		  server: {
			  files: [{
				  expand: true,     // Enable dynamic expansion.
				  cwd: '<%= yeoman.app %>/styles/',      // Src matches are relative to this path.
				  src: ['**/*.less'], // Actual pattern(s) to match.
				  dest: '.tmp/styles/',   // Destination path prefix.
				  ext: '.css' // Dest filepaths will have this extension.
			  }]
		  }
	  },
    concurrent: {
      server: [
        'coffee:dist',
	      'copy:styles'
      ],
      test: [
        'coffee',
	      'copy:styles'
      ],
      dist: [
        'coffee',
	      'copy:styles',
        'imagemin',
        'svgmin'
        //'htmlmin'
      ]
    },
//    protractor: {
//      options: {
//        keepAlive: false,
//        configFile: "./test/protractor.conf.js"
//      },
//      singlerun: {},
//      auto: {
//        keepAlive: true,
//        options: {
//          args: {
//            seleniumPort: 4444
//          }
//        }
//      }
//    },
//    karma: {
//      unit: {
//        configFile: './test/karma-unit.conf.js',
//        autoWatch: false,
//        singleRun: true
//      },
//      unit_auto: {
//        configFile: './test/karma-unit.conf.js',
//        autoWatch: true,
//        singleRun: false
//      }
//    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    }
//    vows : {
//      options : {
//        reporter : "spec"
//      },
//      test : {
//        src : ["test/node/*.js", "test/node/**/*.js"]
//      }
//    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'express:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
	    'less:server',
      'concurrent:server',
      'express:livereload',
	    'autoprefixer',
      'open:server',
      'watch'
    ]);
  });

  //single run tests
  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'less',
    'autoprefixer'
//    'test:unit',
//    'test:e2e',
//    'test:vows'
  ]);
//  grunt.registerTask('test:unit', ['karma:unit']);
//  grunt.registerTask('test:vows', ['express:test', 'open:test', 'vows:test']);
//  grunt.registerTask('test:e2e', ['express:test','protractor:singlerun']);
//
//  //autotest and watch tests
//  grunt.registerTask('autotest', ['karma:unit_auto']);
//  grunt.registerTask('autotest:unit', ['karma:unit_auto']);
//  grunt.registerTask('autotest:e2e', ['express:test','open:test', 'shell:selenium','watch:protractor']);

  //installation-related
//  grunt.registerTask('install:protractor', ['shell:protractor_install', 'shell:selenium']);
//  grunt.registerTask('install', ['update','install:protractor']);
//  grunt.registerTask('update', ['shell:npm_install','shell:bower_install']);

  grunt.registerTask('build', [
    'clean:dist',
	  'less:dist',
    'less:dev',
    'useminPrepare',
    'concurrent:dist',
	  'autoprefixer',
    'concat',
	  'copy:dist',
	  'copy:styles',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
  //  'jshint',
 //   'test',
    'build'
  ]);
};
