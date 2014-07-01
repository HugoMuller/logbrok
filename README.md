logbrok
=======

Simple logger that add some colors to node's default console

Quick Start
===========

Installation
------------

    TODO

Usage
-----

    var console = require('./logbrok')(__filename);
    
    console.info('this is an information');
    console.log('hello');
    console.warn('warning!');
    console.error('ERROR!!!');

Running tests
=============

Unit Tests are done with [mocha](http://visionmedia.github.io/mocha/).
You need to install this framework in order to run the tests:
    
    npm install mocha -g

Then, to run the tests, simply do:

    npm test

License
=======

[The MIT License](https://github.com/HugoMuller/logbrok/blob/master/LICENSE)
