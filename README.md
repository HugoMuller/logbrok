logbrok
=======

[![NPM version](https://badge.fury.io/js/logbrok.png)](http://badge.fury.io/js/logbrok)

Simple logger that add some colors to node's default console.  
Inspired by [consolation](https://github.com/alexjab/consolation.git).

-------

![image](http://i.imgur.com/YPZabhd.png?1)

Installation
------------

    npm install logbrok

Usage
-----

###Basic Usage

    var console = require('logbrok')(__filename);
    
    console.info('this is an information');
    console.log('hello');
    console.warn('warning!');
    console.error('ERROR!!!');

You can also chain method calls:

    console
      .info('this is an information')
      .log('hello')
      .warn('warning!')
      .error('ERROR!!!');

###Extented Usage

#####Options

You can pass some options when instanciating the logger:

    var console = require('logbrok')({ title: __filename, log_level: 'warn', color: true });
    
The available options you can use are:

 - `title [String]`: a custom title for the logger. It can be the filename, or whatever you want. (default is `null`),
 - `color [Boolean]`: whether to output colored lines or not. `false` is a good choice if you need to output the log lines to a file (default is `true`),
 - `bright [Boolean]`: whether to use bright colors, or normal colors. It has no effect if color is false (default is `true`),
 - `time [Boolean]`: whether to display the record time on each line, or not (default is `true`),
 - `show_date [Boolean]`: whether to display the full date time, or just the time. It has no effect if time is false (default is `true`),
 - `log_level [String]`: the minimum level of log. The supported levels are: `['info', 'log', 'warn', 'error']` (default is `'log'`).

**Note**: The title is parsed using *path.basename*. So, `'my/own/custom.title'` becomes `'custom.title'`.

#####Change the options

If you want, you can change some options after the instanciation.

    var console = require('logbrok')({ title: __filename, color: true });
    
    console
      .error('this error is printed in red!')
      .set({color: false})
      .error('and this one is printed with the default color...');

Running tests
-------------

Unit Tests are run with [mocha](http://mochajs.org/).
You need to install this framework in order to run the tests:
    
    npm install mocha -g

Then, to run the tests, simply do:

    npm test

License
-------

[The MIT License](https://github.com/HugoMuller/logbrok/blob/master/LICENSE)
