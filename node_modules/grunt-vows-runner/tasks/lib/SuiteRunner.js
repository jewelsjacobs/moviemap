'use strict';

var _ = require('lodash');

var StringWriter = require('./StringWriter');

var reporterBasePath = "vows/lib/vows/reporters/";

function SuiteRunner(suite, options, writer){
  this.suite = suite;
  this.writer = writer || new StringWriter();

  options = options || {};

  var defaultOptions = {
    reporter : "dot-matrix"
  };

  _.defaults(options, defaultOptions);
  _.defaults(suite.options, options);

  // special cases:
  // options.error : false set on the task/target overrides true on the suite
  //
  // TODO: get rid of this by fixing the hard-coded option in vows-core

  if (options.error === false) {
    suite.options.error = false;
  }

  // first try our own collection of reporters

  options.writer = this.writer;

  this.reporter = getReporter(suite.options.reporter.toLowerCase(), options);

  // if that didn't work try the reporters in vows itself
  //
  // TODO: remove the stuff in the else clause once all the reporters have been ported, and we are using vows-core

  if (this.reporter) {
    suite.options.reporter = this.reporter;
  }
  else {
    var reporterPath = reporterBasePath + suite.options.reporter;

    delete require.cache[require.resolve(reporterPath)];
    this.reporter = require(reporterPath);
    this.reporter.setStream(this.writer);

    suite.options.reporter = {
      report : function(data, filename){
        // defer the finish event until all the suites in the task are done, so we can output the totals
        if (data[0] === 'finish') {
          this.writer.write(' \n');
        }
        else {
          this.reporter.report(data, filename);
        }
      }.bind(this)
    };
  }

  _.bindAll(this);
}

SuiteRunner.prototype = {
  constructor : SuiteRunner,

  run : function(callback){
    var suiteCallback = function(results){
      process.nextTick(function(){
        results = this.checkAsync() || results;
        callback(null, results, this.getOutput());
      }.bind(this));
    }.bind(this);
    this.suite.run({}, suiteCallback);
  },

  getOutput : function(){
    return this.writer.toString();
  },

  start : function(){
    this.reporter.report(['start'], this.writer);
    return this.getOutput();
  },

  results : function(results){
    this.reporter.report(['results', results], this.writer);
    return this.getOutput();
  },

  // TODO: this should go in vows-core, before a suite emits 'finish' or returns results

  checkAsync : function(){
    var totals = { honored : 0, broken : 0, errored : 0, pending : 0, total : 0 };
    var s = this.suite;
    var sw = this.writer;
    var failure;

    if ((s.results.total > 0) && (s.results.time === null)) {
      sw.write('\n\n');
      s.reporter.report(['error', { error : "Asynchronous Error", suite : s }]);
    }
    s.batches.forEach(function(b){
      var unFired = [];

      b.vows.forEach(function(vow){
        if (!vow.status) {
          if (unFired.indexOf(vow.context) === -1) {
            unFired.push(vow.context);
          }
        }
      });

      if (unFired.length > 0) {
        sw.write('\n');
      }

      unFired.forEach(function(title){
        s.reporter.report([
          'error', {
            error : "callback not fired",
            context : title,
            batch : b,
            suite : s
          }
        ]);
      });

      if (b.status === 'begin') {
        failure = true;
        totals.errored++;
        totals.total++;
      }
      Object.keys(totals).forEach(function(k){
        totals[k] += b[k];
      });
    });

    if (failure) {
      return totals;
    }
  }

};

function getReporter(reporter, options){
  var Reporter;
  try{
    Reporter = require('./reporters/' + reporter);
  } catch (e){
    return;
  }
  _.defaults(options, {
    writer : process.stdout
  });
  return new Reporter(options);
}

module.exports = SuiteRunner;
