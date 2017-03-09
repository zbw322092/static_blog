var st = require('st');
var http = require('http');

http.createServer(
	st(process.cwd())
).listen(1337);