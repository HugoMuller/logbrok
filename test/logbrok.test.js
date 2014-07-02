'use strict';

require('should');
var path = require('path');
var console = require('../logbrok')(__filename);

describe('<Unit Test>', function(){
  describe('Module Logbrok', function(){
    describe('Method now', function(){
      it('should return current time using the following pattern: MMM DD, YYYY - HH:mm:ss', function(){
        var expected = /[A-Za-z]{3,4} \d{2}, \d{4} - \d{2}:\d{2}:\d{2}/;
        expected.test(console.now()).should.equal(true);
      });
    });

    describe('Method set', function(){
      var options = { title: path.basename(__filename), color: false, time: true, log_level: 'log' };
      it('should begin with default options and a custom title', function(){
        console.options.should.containEql(options);
      });

      it('should update the options of the console', function(){
        var new_options = { title: 'new title', color: true, time: false, log_level: 'error' };
        console.set(new_options).options.should.containEql(new_options);
      });
      
      after(function(){
        console.set(options);
      });
    });
    
    describe('Some example...', function(){
      it('should print some examples...', function(done){
        console
          .set({color: true})

          .set({log_level: 'error'})
          .error('this error should be printed')
          .log('this log should not be printed')

          .set({log_level: 'warn'})
          .error('this error should be printed')
          .warn('this warning should be printed')
          .log('this log should not be printed')

          .set({log_level: 'log'})
          .error('this error should be printed')
          .log('this log should be printed')
          .info('this info should not be printed')

          .set({log_level: 'info'})
          .error('this error should be printed')
          .info('this info should be printed');
        done();
      });
    });
  });
});
