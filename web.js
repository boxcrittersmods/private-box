const express = require('express');
var app = express();

app.use(express.static('public'));

module.exports = app;