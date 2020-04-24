"use strict"

var port = process.env.PORT || 3000

var http = require('http')
const path = require('path')
var express = require('express')
var app = express()
var server = http.Server(app)
app.set('port', port)

server.listen(port, function () {
	console.log(`Starting server on port: ${port}, directory: ${__dirname}`)
})

global.appDir = __dirname
var {main,world} = require('./server/main')
main(server)