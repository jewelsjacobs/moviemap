'use strict';

var _ = require('lodash');
var vowsConsole = require('vows/lib/vows/console');
var stylize = vowsConsole.stylize;

function Spec(options){

  this.options = options;

  this.puts = vowsConsole.puts({
    tail : '\n',
    stream : this.options.writer
  });

  _.bindAll(this);
}

Spec.prototype = {
  constructor : Spec,
  name : 'spec',
  report : function(args){
    var event = args[0];
    var data = args[1];

    switch (event) {
      case 'start':
        break;
      case 'subject':
        this.puts('\n♢ ' + stylize(data, 'bold'));
        break;
      case 'context':
        this.puts(vowsConsole.contextText(data));
        break;
      case 'vow':
        this.puts(vowsConsole.vowText(data));
        break;
      case 'end':
        break;
      case 'error':
        this.puts(vowsConsole.error(data));
        break;
      case 'results' :
        this.puts(vowsConsole.result(data).join('\n'));
        break;
    }
  }
};

module.exports = Spec;
