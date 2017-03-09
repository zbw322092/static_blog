var st = require('st');
var express = require('express');
var chokidar = require('chokidar');
var http = require('http');
var fs = require('fs');
var app = express();

var mount = st({
  path: __dirname + '/static/',
  dot: true,
  // index: false,
  index: 'index.html',
  gzip: true
});

http.createServer(function(req, res) {
  if (mount(req, res)) {
    return;
  } else {
    res.end('error');
  }
}).listen(1340);

fs.stat('./static/file.html', function(err, stats) {
	console.log(stats);
});

// fs.stat('./static/file2.html', function(err, stats) {
// 	console.log(err);
// 	console.log(stats);
// });

const opts = {
  persistent: true,
  ignoreInitial: true,
  followSymlinks: true,
  usePolling: true,
  alwaysStat: false,
  depth: undefined,
  interval: 100,
  ignorePermissionErrors: false,
  atomic: true
};

const locales = chokidar.watch(path.join(__dirname, 'locale'), opts)
const layouts = chokidar.watch(path.join(__dirname, 'layouts'), opts)
const statics = chokidar.watch(path.join(__dirname, 'static'), opts)

// var log = console.log.bind(console);

// var watcher = chokidar.watch('./static/', {
// 	ignored: /[\/\\]\./
// });

// watcher.on('change', function(path) {
// 	log(`File ${path} has been changed`);
// });





