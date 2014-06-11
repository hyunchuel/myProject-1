{
    "use strict";

    var redis = require('redis');
    var cfg = require('../cfg/config.json');

    var Redis = function(host, ip){
        this,host = host;
        this.ip = ip;
        this.pool = {};
        this.connection(host, ip);
    };

    /** redis 연결 객체. */
    Redis.prototype.connection = function(poolName, host, ip){
        var self = this, client;

        client = redis.createClient(host, ip);
        self.pool[poolName] || (self.pool[poolName] = client);

        client.on('error', function(err){
            console.log('Redis.connection err:%s', err.message);

            if (self.pool[poolName]){
                delete self.pool[poolName];
            };
            client.quit();
        });
    };

    /** redis 값 셋팅. */
    Redis.prototype.set = function(poolName, key, value, timeout, cb){
        var self = this;
        var pool = self.pool[poolName];
        if(!pool)
            throw new Error('not_found_redis_connection');

        pool.set(key, value, function(err){
            if (err)
                return cb(err);

            if (timeout === 0)
                return cb(null);

            pool.expire(key, timeout, function(err){
                return cb(err);
            });
        });
    }

    /** redis 값 가져오기.*/
    Redis.prototype.get = function(poolName, key, timeout, cb){
        var self = this;
        var pool = self.pool[poolName];
        if(!pool)
            throw new Error('not_found_redis_connection');

        pool.get(key, function(getErr, result){
            if(getErr)
                return cb(getErr);

            if(result === null)
                return cb(new Error('expire_session_key'));

            if(timeout === 0)
                return cb(null, result);

            pool.expire(key, timeout, function(expireErr){
                if(expireErr)
                    return cb(expireErr);

                return cb(null, result);
            })
        });
    }

    module.exports.Redis = function(host, ip){
        return new Redis(host, ip);
    }
}
