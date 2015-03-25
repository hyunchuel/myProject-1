{
    "use strict"

    var redisModule = require('./lib_redis');
    var defaultCfg = require('../cfg/default.json');
    var mysqlModule = require('./lib_database');

    global.cfg = require('../cfg/config.json');


    var BaseConstructor = function(){
        this.redisClient = null;
        this.systemDb = null;
    };

    BaseConstructor.prototype.init = function(cb){
        var self = this;

        self.systemDb = mysqlModule.createObject(defaultCfg.dbCfg.system);

        self.systemDb.execute('select * from T_PROPERTY',function(err, ack){
            if(err) return cb(err);

            cb(null, ack);
        });
    };



    module.exports.BaseConstructor = BaseConstructor;
}
