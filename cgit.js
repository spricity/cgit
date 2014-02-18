#!/usr/bin/env node

var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';

// fake app

debug('booting %s', name);

// http.createServer(function(req, res){
//   debug(req.method + ' ' + req.url);
//   res.end('hello\n');
// }).listen(3000, function(){
//   debug('listening');
// });

// require('./work');


 var cp = require('child_process');
  //exec可以像spawn一样使用
  var ls = cp.exec('git ls-remote', {}/*options, [optional]*/);

  ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  ls.on('exit', function (code) {
    console.log('child process exited with code ' + code);
  });