const webserver = require('webserver');
const app = require('./web');

const boxCritters = require('./boxcritters');

var server = webserver(app);
boxCritters(server);