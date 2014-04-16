#!/usr/bin/env node

var debug = require('debug')('http')
  , http = require('http')
  , name = 'cgit';

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
var ls = cp.exec("git ls-remote | awk '{print $2}'", {});

ls.stdout.on('data', function (data) {
	var remotes = data.split('\n');
	var daily = [], online = [];
	remotes.forEach(function(item){
		if(/refs\/heads\/daily\/(\d+\.\d+\.\d+)/.test(item)){
			daily.push(RegExp.$1);
		}else if(/refs\/tags\/publish\/(\d+\.\d+\.\d+)/.test(item)){
			online.push(RegExp.$1);
		}
	});

	// online = ['1.0.0', '1.0.1', '1.0.3', '1.1.2', '1.2.4', '2.0.1', '2.0.3'];
	console.log('daily max version is : ', get_max_version(daily));
	console.log('publish max version is : ', get_max_version(online));
});

ls.stderr.on('data', function (data) {
	// console.log('stderr: ' + data);
});

ls.on('exit', function (code) {
	console.log('child process exited with code ' + code);
});

function get_max_version(data){
	var xyz = {};
	data.forEach(function(item){
		var split = item.split('.');
		var x = parseInt(split[0], 10), y = parseInt(split[1], 10), z = parseInt(split[2], 10);
		if(!xyz[x]){
			xyz[x] = {};
		}
		if(!xyz[x][y]){
			xyz[x][y] = [];
		}
		xyz[x][y].push(z);
	});
	var __x__ = [];
	for(var __x in xyz){
		__x__.push(__x);
		var max_x = __x__.max();


		var yz = xyz[__x];
		var __y__ = [];
		for(var __y in yz){
			__y__.push(__y);
		}
		var max_y = __y__.max();
		var __z__ = yz[max_y];
		var max_z = __z__.max();
		return max_x + '.' + max_y + '.' + max_z;
	}
}

Array.prototype.max = function() {
	var max = this[0];
	var len = this.length;
	for (var i = 1; i < len; i++){
		if (this[i] > max) {
			max = this[i];
		}
	}
	return max;
}
