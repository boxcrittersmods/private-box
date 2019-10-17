const path = require('path');
const webserver = require('webserver');

global.appDir = path.dirname(require.main.filename);

const app = require('./server/web');
const boxCritters = require('./server/boxcritters');

var server = webserver(app);
boxCritters(server);