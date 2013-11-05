/* Xunit output optimized for Jenkins
 xsd: https://gist.github.com/jzelenkov/959290
 */

'use strict';

var _ = require('lodash');
var vowsConsole = require('vows/lib/vows/console');

function Xunit(options){

  this.options = options;

  this.puts = vowsConsole.puts({
    raw : true,
    tail : '\n',
    stream : this.options.writer
  });

  _.bindAll(this);
}

Xunit.prototype = {
  constructor : Xunit,
  name : 'Xunit',
  report : function(args){
    var event = args[0];
    var data = args[1];
    var ex = data && data.exception;
    if(ex && ex.error){
      ex = ex.error;
    }

    switch (event) {

      case 'start' :
        this.puts(tag('testsuites'));
        break;

      case 'subject' :
        this.suite = data;
        this.puts(tag('testsuite', {
          name : this.suite,
          timestamp : (new Date()).toUTCString()
        }));
        break;

      case 'context' :
        break;

      case 'vow' :
        var names = {};
        var params = {
          suite : this.suite,
          data : data
        };
        Xunit.getNames(params, names);
        var inner;

        switch (data.status) {
          case 'honored':
            this.puts(tag('testcase', {classname : names.class, name : names.test}, true));
            break;
          case 'broken':
            inner = tag('failure', {type : exceptionType(ex)}, false, cdata(ex));
            this.puts(tag('testcase', {classname : names.class, name : names.test}, false, inner));
            break;
          case 'errored':
            inner = tag('error', {type : exceptionType(ex)}, false, cdata(ex));
            this.puts(tag('testcase', {classname : names.class, name : names.test}, false, inner));
            break;
          case 'pending':
            break;
        }
        break;

      case 'finish' :
        if(this.suite){
          this.puts(end('testsuite'));
        }
        break;

      case 'results' :
        this.puts(tag('testsuite', {
          name : 'Results',
          tests : data.total,
          timestamp : (new Date()).toUTCString(),
          errors : data.errored,
          failures : data.broken,
          skip : data.pending,
          time : data.time
        }, true));
        this.puts(end('testsuites'));
        break;
    }
  }
};

// Helper functions for working with XML

function xmlEnc(value){
  return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\u001b\[\d{1,2}m/g, '');
}

function tag(name, attribs, single, content){
  var strAttr = [], t, end = '>';
  for (var attr in attribs) {
    if (attribs.hasOwnProperty(attr)) {
      strAttr.push(attr + '="' + xmlEnc(attribs[attr]) + '"');
    }
  }
  if (single) {
    end = ' />';
  }
  if (strAttr.length) {
    t = '<' + name + ' ' + strAttr.join(' ') + end;
  }
  else {
    t = '<' + name + end;
  }
  if (typeof content !== 'undefined') {
    return t + content + '</' + name + end;
  }
  return t;
}

function end(name){
  return '</' + name + '>';
}

function cdata(data){
  return '<![CDATA[' + xmlEnc(data) + ']]>';
}

function exceptionType(ex){
  if (ex && ex.indexOf){
    return ex.substring(0, ex.indexOf(':'));
  }
}

// Helper functions for determining test and class names

Xunit.getNames = function(params, names){
  // split levels on colons that have something after them

  var levels = params.data.context.split(/:(?=.)/);
  var firstLevels = levels.slice(0, -1);
  var lastLevel = levels.slice(-1);

  // the "classname" is the suite plus any levels before the last (or just the last level, if there is only one level)

  if(firstLevels.length){

    // join all levels but the last with '.'s, but replace all the '.'s with '-' first.

    names.class = params.suite.replace('.', '-') + '.' + firstLevels.reduce(function(s, level){
      return s + '.' + level.replace('.', '-');
    });
  } else {
    names.class = params.suite.replace('.', '-') + '.' + lastLevel.toString().replace('.', '-');
  }

  names.test = lastLevel + ':' + params.data.title;
};

module.exports = Xunit;
