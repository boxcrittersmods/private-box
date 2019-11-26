const path = require('path');
const WebServer = require('tn-webserver');

global.appDir = path.dirname(require.main.filename);

const app = require('./server/web');
const boxCritters = require('./server/boxcritters');

var server = WebServer(app);
boxCritters(server);