var cfg = require('../cfg/config.json');
var errCode = require('../cfg/errorCode.json');
global.const = require('../cfg/const.json');

console.dir(cfg);
console.log(errCode[200]);
console.log(global.const);
