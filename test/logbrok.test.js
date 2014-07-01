'use strict';

require('should');
var path = require('path');
var console = require('../logbrok')(__filename);

describe('<Unit Test>', function(){
  describe('Module Logbrok', function(){
    describe('Method title', function(){
      it('should begin with __filename as title', function(){
        console._title.should.equal(path.basename(__filename));
      });
      
      it('should set the title of the console', function(){
        console.title('new title')._title.should.equal('new title');
      });
    });
    
    describe('Method now', function(){
      it('should return current time using the following pattern: MMM DD, YYYY - HH:mm:ss', function(done){
        var actual = console.now();
        var expected = /[A-Za-z]{3,4} \d{2}, \d{4} - \d{2}:\d{2}:\d{2}/;
        (actual.length === 24 || actual.length === 25).should.equal(true);
        expected.test(actual).should.equal(true);
        done();
      });
    });
  });
});
