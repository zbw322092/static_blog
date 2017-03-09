var st = require('st');
var express = require('express');
var http = require('http');
var app = express();


http.createServer(
	st(process.cwd())
).listen(1337);

var mount = st({
	path: __dirname + '/static',
	url: '/static'
});

http.createServer(function(req, res) {
	var stHandled = mount(req, res);
	if (stHandled) {
		return;
	} else {
		res.end('this is not a static file');
	}

}).listen(1338);

// express style
http.createServer(function(req, res) {
  mount(req, res, function() {
    res.end('this is not a static file')
  })

}).listen(1339);

var mount2 = st({
  path: __dirname + '/static/',
  dot: true,
  // index: false,
  index: 'index.html',
  gzip: true
});

http.createServer(function(req, res) {
    if (mount2(req, res)) {
        return;
    } else {
        res.end('error');
    }
}).listen(1340);


// express way
// app.use(mount2);

app.route('/subfolder/:file')
.get(function(req, res, next) {
	console.log(req);
	mount2(req, res, next);
});

app.listen(1341, function() {
	console.log('Express listen on port 1341');
});
