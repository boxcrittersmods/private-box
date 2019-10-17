const fs = require('fs');

function ReadJSON(file) {
    return new Promise((resolve,reject)=>{
        fs.readFile(require.resolve(file), (err,data)=>{
            if(err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
    
}

module.exports = ReadJSON;