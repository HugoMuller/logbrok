'use strict';

var path = require('path');

/*
 * A basic Logger that add some colors to node's default console"
 */
var Logbrok = function(title){
  this._title = path.basename(title);
  return this;
};

/**
 * 
 * @returns {string}
 */
Logbrok.prototype.now = function(){
  var time = new Date();
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var time_array = [time.getDate(), time.getHours(), time.getMinutes(), time.getSeconds()]
    .map(function(elem){
      return (elem.toString().length < 2) ? '0'+elem : elem;
    });
  return months[time.getMonth()]+' '+time_array.shift()+', '+time.getFullYear()+' - '+time_array.join(':');
};

/**
 * Set the title of the Logbrok console
 * @param title
 * @returns {Logbrok}
 */
Logbrok.prototype.title = function(title){
  this._title = path.basename(title);
  return this;
};

/*
 * Extend main methods of default console
 */
['debug', 'dir', 'error', 'exception', 'info', 'log', 'trace', 'warn'].forEach(function(f){
  Logbrok.prototype[f] = function(){
    var args = Array.prototype.slice.call(arguments);
    if(this._title && this._title.length>0) args.unshift('['+this._title+']');
    args.unshift(this.now());
    console[f].apply(this, args);
    return this;
  };
});

module.exports = function(title){ return new Logbrok(title); };
