'use strict';

var path = require('path');

/*
 * A basic Logger that add some colors to node's default console"
 */
var Logbrok = function(options){
  options = options || {};
  
  this.options = {
    color: false,
    bright: true,
    time: true,
    show_date: true,
    log_level: 'log'
  };
  
  if(typeof options === 'string') this.options.title = path.basename(options);
  else this.set(options);
  
  return this;
};

/**
 * Return current time using the following pattern: MMM DD, YYYY - HH:mm:ss
 * @returns {string}
 */
Logbrok.prototype.now = function(){
  var time = new Date();
  var time_array = [time.getFullYear(), time.getMonth()+1, time.getDate(), time.getHours(), time.getMinutes(), time.getSeconds()]
    .map(function(elem){
      return (elem.toString().length < 2) ? '0'+elem : elem;
    });
  return time_array.splice(0, 3).join('/') + ' ' + time_array.join(':');
};

/**
 * Update the options of the Logbrok console
 * @param options
 * @returns {Logbrok}
 */
Logbrok.prototype.set = function(options){
  Object.keys(options).forEach(function(option){
    this.options[option] = options[option];
  }, this);
  if(options.title) this.options.title = path.basename(options.title);
  return this;
};

// logger's methods, with their own log levels and colors.
var methods = {
  error: { lvl: 3, color: '\x1B[31m' },
  trace: { lvl: 3, color: '\x1B[31m' },
  warn:  { lvl: 2, color: '\x1B[33m' },
  log:   { lvl: 1, color: '\x1B[32m' },
  dir:   { lvl: 1, color: '\x1B[32m' },
  info:  { lvl: 0, color: '\x1B[36m' }
};

// determine if the logger should print or not accordind to its log level
var canPrint = function(f, ref){
  if(!methods[ref]) ref = 'log';
  return methods[f].lvl >= methods[ref].lvl;
};

// return the correct method's color, or the default one
var colorOf = function(f, bright){
  if(f === 'time') return bright ? '\x1B[35;1m' : '\x1B[35m';
  if(f === 'default' || !methods[f]) return '\x1B[39m';
  return bright ? methods[f].color.replace('m', ';1m') : methods[f].color;
};

/*
 * Extend main methods of default console
 */
Object.keys(methods).forEach(function(f){
  Logbrok.prototype[f] = function(){
    if(!canPrint(f, this.options.log_level)) return this;
    var args = Array.prototype.slice.call(arguments);
    var star = false;
    var colors = { def: '', time: '' };
    
    if(this.options.color){
      colors = { def: colorOf('default'), time: colorOf('time', this.options.bright) };
      args[0] = colorOf(f, this.options.bright)+args[0];
      args.push(colors.def);
    }
    if(this.options.title && this.options.title.length>0){
      star = true;
      args.unshift('*');
      args.unshift(colors.def+'['+this.options.title+']');
    }
    if(this.options.time){
      var time = this.now();
      if(!this.options.show_date) time = time.split(' ').pop();
      if(!star) args.unshift('*');
      args.unshift(colors.time+time);
    }
    console[f].apply(this, args);
    return this;
  };
});

module.exports = function(title){ return new Logbrok(title); };
