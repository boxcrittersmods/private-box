const express = require("express");
const path = require("path");
const WebServer = require("tn-webserver");
const doubleb = require("doubleb.js");
const fs = require("fs");

doubleb.add_handler("pb-plugins-tags", "{{pb-plugins-tags}}", function (match) {
	var result = "";
	doubleb.config["pb-plugins"].forEach(function (plugin) {
		result = (result || "") + "<script src=\"" + doubleb.config.url + "/plugins/" + plugin + "/index.js\"></script>";
	});
	return result;
});

doubleb.add_handler("pb-plugins-load", "{{pb-plugins-load}}", function (match) {
	var result = "";
	doubleb.config["pb-plugins"].forEach(function (plugin) {
		result = "Plugin.LoadPlugin(" + plugin + ");";
	});
	return result;
});

if (process.argv[2] == "--dev")
{
	global.dev = true;
}

doubleb(global.dev ? "./_config.dev.json" : "./_config.json");

const app = require('./server/web');
if (global.dev)
{
	app.use(express.static(path.join(path.dirname(__filename), "./docs/")));
}

const boxCritters = require('./server/boxcritters');

var server = WebServer(app);
boxCritters(server);
