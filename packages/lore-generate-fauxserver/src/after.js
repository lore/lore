var Promise = require('bluebird');
var spawn = require('child_process').spawn;

module.exports = function(scope) {
  return new Promise(function(resolve, reject) {
    var cmd = 'npm install faux-server --save';
    console.log("running: " + cmd);
    spawn('npm', ['install', 'faux-server', '--save'], {
      stdio:'inherit'
    }).on('data', function(data) {
      console.log(data);
    }).on('data', function(data) {
      console.log(data);
    }).on('close', function(code) {
      if(code !== 0) {
        reject(code);
      } else {
        resolve();
      }
    });
  });
};
