'use strict';

var path = require('path');

/**
 * A basic logger that adds some colors to node's default console
 * @param options
 * @returns {Logbrok}
 * @constructor
 */
var Logbrok = function(options){
  options = options || {};
  
  this.options = {
    title: null,
    color: true,
    bright: true,
    time: true,
    show_date: true,
    log_level: 'log'
  };

  if(typeof options === 'string') options = { title: options };
  return this.set(options);
};

/**
 * Return current time using the following pattern: YYYY/MM/DD HH:mm:ss
 * @returns {string}
 */
Logbrok.prototype.now = function(){
  var time = new Date();
  var time_array = [time.getFullYear(), time.getMonth()+1, time.getDate(), time.getHours(), time.getMinutes(), time.getSeconds()]
    .map(function(elem){
      return (elem < 10) ? '0'+elem : elem;
    });
  return time_array.splice(0, 3).join('/') + ' ' + time_array.join(':');
};

/**
 * Update the options of the Logbrok console
 * @param {object} options - The options to change
 * @returns {Logbrok}
 */
Logbrok.prototype.set = function(options){
  if(options.hasOwnProperty('title') && options.title) options.title = path.basename(options.title);

  Object.keys(options).forEach(function(option){
    this.options[option] = options[option];
  }, this);
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

/**
 * Determine if the logger should print something or not accordind to its log level
 * @param {string} f - The method name to test
 * @param {string} ref - The minimum log level
 * @returns {boolean}
 */
var canPrint = function(f, ref){
  if(!methods[ref]) ref = 'log';
  return methods[f].lvl >= methods[ref].lvl;
};

/**
 * Return the correct method's color, or the default one
 * @param {string} f - A method name, or 'default' or 'time'
 * @param {boolean} bright - Set color intensity to bright or normal
 * @returns {string}
 */
var colorOf = function(f, bright){
  if(f === 'time') return bright ? '\x1B[35;1m' : '\x1B[35m';
  if(f === 'default' || !methods[f]) return '\x1B[39m';
  return bright ? methods[f].color.replace('m', ';1m') : methods[f].color;
};

Object.keys(methods).forEach(function(f){
  /**
   * Extend main methods of default console, defined in the methods variable
   * @returns {Logbrok}
   */
  Logbrok.prototype[f] = function(){
    if(!canPrint(f, this.options.log_level)) return this;
    var args = Array.prototype.slice.call(arguments);
    var star = false;
    var colors = { def: '', time: '' };
    
    if(this.options.color){
      colors = { def: colorOf('default'), time: colorOf('time', this.options.bright) };
      args.unshift(colorOf(f, this.options.bright));
      args.push(colors.def);
    }
    if(this.options.title && this.options.title.length>0){
      star = true;
      args[0] = '*'+args[0];
      args.unshift(colors.def+'['+this.options.title+']');
    }
    if(this.options.time){
      var time = this.now();
      if(!this.options.show_date) time = time.split(' ').pop();
      if(!star) args[0] = colors.def+'*'+args[0];
      args.unshift(colors.time+time);
    }
    console[f].apply(this, args);
    return this;
  };
});

module.exports = function(options){ return new Logbrok(options); };
