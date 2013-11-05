'use strict';

var fs = require('fs');
var SuiteRunner = require('./lib/SuiteRunner');
var vowsConsole = require('vows/lib/vows/console');
var vows = require('vows');

module.exports = function(grunt){
  var helper = new VowsHelper(grunt);
  grunt.registerMultiTask('vows', 'Runs vows tests.', function(){
    var files = this.files[0].src;
    var targetName = this.name + ':' + this.target;
    var done = this.async();
    var options = this.options();

    if(options.disabled){
      grunt.log.ok(targetName + ' tests disabled');
      done();
      return;
    }

    grunt.verbose.subhead(targetName + ' options').writeflags(options);

    if (files.length) {
      helper.outputFile = this.files[0].dest;

      if (helper.outputFile) {
        grunt.verbose.writeln(targetName + ' deleting output file');
        try {
          fs.unlinkSync(helper.outputFile);
        } catch(e) {}
        grunt.verbose.writeln(targetName + ' writing output to "' + helper.outputFile + '"');
      }

      var _ = grunt.util._;
      var async = grunt.util.async;
      var suiteTasks = {};
      helper.writeOutput(new SuiteRunner(vows.describe('Start'), options).start());

      _.forEach(files, function(filename){
        var fullFilename = process.cwd() + '/' + filename;

        // Require the suites in the file, but don't cache them.  This way we can run them multiple times with different options.

        delete require.cache[require.resolve(fullFilename)];
        var file = require(fullFilename);

        _.forEach(file, function(suite){
          suite._filename = filename;
          grunt.verbose.writeln(targetName + ' starting "' + suite.subject + '"');
          var suiteRunner = new SuiteRunner(suite, options);
          suiteTasks[suite.subject] = function(callback){
            suiteRunner.run(function(error, result, output){
              helper.writeOutput(output);
              callback(error, result);
            });
          };
        });

      });

      async.parallel(suiteTasks, function(error, results){

        // report the totals and tell grunt we are done

        var totals = _.reduce(results, function(subTotals, result){
          return _.reduce(result, function(x, total, header){
            x[header] = total + subTotals[header];
            return x;
          }, {});
        });

        helper.writeOutput(new SuiteRunner(vows.describe('Results'), options).results(totals));
        grunt.log.ok(targetName + " done");
        grunt.verbose.writeflags(totals);

        if(totals.errored || totals.broken){
          done(false);
        }
        else{
          done();
        }

      });

      // TODO: remove this when we are using vows-core

      vows.suites = []; // so it doesn't try to do anything on process.exit (see "vows.js")
    }
    else {
      grunt.log.error(targetName + ' no test files');
      done();
    }
  });
};

function VowsHelper(grunt){
  this.grunt = grunt;
  vowsConsole.nocolor = grunt.option('no-color');
}

VowsHelper.prototype = {
  writeOutput : function(output){
    if(this.outputFile){
      fs.appendFileSync(this.outputFile, output);
    }
    else{
      this.grunt.log.oklns(output);
    }
  }
};


