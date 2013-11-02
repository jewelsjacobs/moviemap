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
	    },
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
          server: path.resolve('./app.js'),
          bases: [path.resolve('./.tmp'), path.resolve(__dirname, 'test')]
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
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
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
			  paths: ['app/components'],
			  //dumpLineNumbers: true
		  },
		  dist: {
			  files: [{
				  expand: true,     // Enable dynamic expansion.
				  cwd: '<%= yeoman.app %>/styles/',      // Src matches are relative to this path.
				  src: ['**/*.less'], // Actual pattern(s) to match.
				  dest: '.tmp/styles/',   // Destination path prefix.
				  ext: '.css',   // Dest filepaths will have this extension.
			  }],
		  },
		  server: {
			  files: [{
				  expand: true,     // Enable dynamic expansion.
				  cwd: '<%= yeoman.app %>/styles/',      // Src matches are relative to this path.
				  src: ['**/*.less'], // Actual pattern(s) to match.
				  dest: '.tmp/styles/',   // Destination path prefix.
				  ext: '.css',   // Dest filepaths will have this extension.
			  }],
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
    karma: {
	    e2e: {
		    configFile: 'karma-e2e.conf.js',
		    singleRun: true
	    },
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
//	  protractor: {
//		  options: {
//			  configFile: "./protractorConf.js", // Default config file
//			  keepAlive: true, // If false, the grunt process stops when the test fails.
//			  args: {
//				  // Arguments passed to the command
//			  }
//		  },
//		  your_target: {
//			  configFile: "e2e.conf.js", // Target-specific config file
//			  options: {
//				  args: {} // Target-specific arguments
//			  }
//		  }
//	  },
//	  vows: {
//		  all: {
//			  options: {
//				  // String {spec|json|dot-matrix|xunit|tap}
//				  // defaults to "dot-matrix"
//				  reporter: "spec",
//				  // String or RegExp which is
//				  // matched against title to
//				  // restrict which tests to run
//				  onlyRun: /helper/,
//				  // Boolean, defaults to false
//				  verbose: false,
//				  // Boolean, defaults to false
//				  silent: false,
//				  // Colorize reporter output,
//				  // boolean, defaults to true
//				  colors: true,
//				  // Run each test in its own
//				  // vows process, defaults to
//				  // false
//				  isolate: false,
//				  // String {plain|html|json|xml}
//				  // defaults to none
//				  coverage: "json"
//			  },
//			  // String or array of strings
//			  // determining which files to include.
//			  // This option is grunt's "full" file format.
//			  src: ["test/*.js", "spec/*"]
//		  }
//	  },
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
//	  vows: {
//		  all: {
//			  options: {
//				  // String {spec|json|dot-matrix|xunit|tap}
//				  // defaults to "dot-matrix"
//				  reporter: "spec",
//				  // String or RegExp which is
//				  // matched against title to
//				  // restrict which tests to run
//				  onlyRun: /helper/,
//				  // Boolean, defaults to false
//				  verbose: false,
//				  // Boolean, defaults to false
//				  silent: false,
//				  // Colorize reporter output,
//				  // boolean, defaults to true
//				  colors: true,
//				  // Run each test in its own
//				  // vows process, defaults to
//				  // false
//				  isolate: false,
//				  // String {plain|html|json|xml}
//				  // defaults to none
//				  coverage: "json"
//			  },
//			  // String or array of strings
//			  // determining which files to include.
//			  // This option is grunt's "full" file format.
//			  src: ["test/*.js", "spec/*"]
//		  }
//	  }
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
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'express:test',
	  'less',
	  'autoprefixer'
//	  'vows',
	//  'protractor',
  //  'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
	  'less:dist',
    'useminPrepare',
    'concurrent:dist',
	  'autoprefixer',
    'concat',
	  'copy:dist',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
