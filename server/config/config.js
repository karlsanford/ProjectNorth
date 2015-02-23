var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development:{
        db: 'mongodb://localhost/projectNorth',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production:{
        db: 'mongodb://karlsanford:projectnorth@ds047581.mongolab.com:47581/projectnorth',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }

};