'use strict';

require('should');
var path = require('path');
var console = require('../logbrok')(__filename);
var console2 = require('../logbrok')({title: __filename+' 2', color: true});

describe('<Unit Tests>', function(){
  describe('Module Logbrok', function(){
    describe('Method now', function(){
      it('should return current time using the following pattern: YYYY/MM/DD HH:mm:ss', function(done){
        var expected = /\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/;
        expected.test(console.now()).should.equal(true);
        done();
      });
    });

    describe('Method set', function(){
      var options = { title: path.basename(__filename), color: true, time: true, log_level: 'log' };
      it('should begin with default options and a custom title', function(done){
        console.options.should.containEql(options);
        done();
      });

      it('should update the options of the console', function(done){
        var new_options = { title: 'new title', color: true, time: false, log_level: 'error' };
        console.set(new_options).options.should.containEql(new_options);
        done();
      });
      
      after(function(finish){
        console.set(options);
        finish();
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
          .info('this info should not be printed');

        console2
          .set({log_level: 'info', show_date: false, bright: false})
          .error('this error should be printed')
          .info('this info should be printed')
          .set({title: null})
          .warn('line without title')
          .set({title: __filename+' 2', time: false})
          .log('line without time')
          .set({title: null})
          .info('nothing but the log')
          .set({color: false})
          .log('standard log line');
        done();
      });
    });
  });
});
