{
    "use strict";

    var mysql = require('mysql');
    var async = require('async');

    var DataBase = function(option){
        var self = this;
        self.pool = null;

        if(!option || typeof(option) != 'object')
            return;

        var connection = mysql.createPool({
            host     : option.host, //'localhost',
            port     : option.port,
            user     : option.user, // 'root',
            password : option.password, //'hyunchuel'
            database : option.database
        });

        self.pool = connection;
    };

    /** pool 에서 커넥션 가져오기.*/
    DataBase.prototype.getPoolToConnection  = function(cb){
        var self = this;
        if(!self.pool)
            return cb('not_found_connection');

        self.pool.getConnection(function(err, con){
            if(err)
                return cb(new Error('not_found_connection'));

            cb(null, con);
        })
    };

    /** 실행 (트랜잭션 x)*/
    DataBase.prototype.nonTranExecute = function(query, cb){
        var self = this;
        if(!self.pool)
            return cb('not_found_connection');


        self.pool.getConnection(function(err, connection){
            err && cb(err);
            if(err) return;

            connection.query(query, function(err, rows){
                cb(err, rows);
                connection.release();
            });
        })
    };

    /** 실행 (트랜잭션) */
    DataBase.prototype.tranExecute = function(query, cb){
        var self = this;
        if(!self.pool)
            return cb('not_found_connection');


        self.pool.getConnection(function(err, connection){
            err && cb(err);
            if(err) return;

            connection.query(query, function(err, rows){
                cb(err, rows);
                connection.release();
            });
        })
    };

    module.exports.createObject = function(option){
        return new DataBase(option);
    };
}

/*
connection.beginTransaction(function(err) {
    if (err) {
        throw err;
    }
    connection.query('insert into users set ?', user, function (err, result) {
        if (err) {
            console.error(err);
            connection.rollback(function () {
                console.error('rollback error');
                throw err;
            });
        }// if err
        console.log('insert transaction log');
        var log = {'userid': req.body.userid};
        connection.query('insert into log set ?', log, function (err, result) {
            if (err) {
                console.error(err);
                connection.rollback(function () {
                    console.error('rollback error');
                    throw err;
                });
            }// if err
            connection.commit(function (err) {
                if (err) {
                    console.error(err);
                    connection.rollback(function () {
                        console.error('rollback error');
                        throw err;
                    });
                }// if err
                res.send(200, 'success');

            });// commit
        });// insert into log
    });// inset into users
}); // begin trnsaction
*/