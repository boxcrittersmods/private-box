const fs = require('fs');

function ReadJSON(file, cb) {
    fs.readFile(require.resolve(file), (err,data)=>{
        if(err) {
            cb(err);
        } else {
            cb(null,JSON.parse(data));
        }
    });
}

module.exports = ReadJSON;