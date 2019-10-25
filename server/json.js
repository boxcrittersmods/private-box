const fs = require('fs');

function JSONExists(file) {
    try {
      return fs.existsSync(path);
    } catch(err) {
        return false;
    }
}

function ReadJSON(file) {
    return new Promise((resolve,reject)=>{
    try {
      if (fs.existsSync(path)) {
        fs.readFile(require.resolve(file), (err,data)=>{
                if(err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
      }
    } catch(err) {
      reject(err)
    }
        
    });
    
}

module.exports = {
ReadJSON,
    JSONExists
};
