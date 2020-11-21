"use strict";

let port = process.env.PORT || 3000;

let http = require('http');
//const path = require('path');
let express = require('express');
let app = express();
let server = http.Server(app);
app.set('port', port);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "referer, range, accept-encoding, origin, x-requested-with, content-type, accept");
	next();
}, express.static(__dirname + '/')); //sends files on request with CORS header

server.listen(port, function () {
	console.log(`Starting server on port: ${port}, directory: ${__dirname}`);
});

let { main, world } = require('./server/main');
main(server);