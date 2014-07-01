'use strict';

require('should');
var console = require('../logbrok')(__filename);

describe('<Unit Test>', function(){
  describe('Module Logbrok', function(){
    describe('Method now', function(){
      it('should return current time using the following pattern: YYYY-MM-DD HH:mm:ss', function(done){
        var actual = console.now();
        var expected = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/;
        actual.length.should.equal(19);
        expected.test(actual).should.equal(true);
        done();
      });
    });
  });
});
