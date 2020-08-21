"use strict";

var port = process.env.PORT || 3000;

var http = require('http');
//const path = require('path');
var express = require('express');
var app = express();
var server = http.Server(app);
app.set('port', port);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
}, express.static(__dirname + '/')); //sends files on request with CORS header

server.listen(port, function () {
	console.log(`Starting server on port: ${port}, directory: ${__dirname}`);
});

var { main, world } = require('./server/main');
main(server);