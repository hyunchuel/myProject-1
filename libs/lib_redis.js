{
    "use strict";

    var redis = require('redis');
    var cfg = require('../cfg/config.json');

    var Redis = function(){

    };

    Redis.prototype.Test = function(){

    };

    module.exports.Redis = function(){
        return new Redis();
    }
}
