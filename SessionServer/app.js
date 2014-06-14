var sessionServerModule = require('./constructor');
var async = require('async');

var server = sessionServerModule.SessionServer();

async.waterfall([
    function (callback) { server.init(callback); }
], function(err, ack){
    if(err){
        console.log(err.message);
    } else{
        console.dir(ack);
    }

});

