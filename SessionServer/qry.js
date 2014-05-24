{
    "use strict";
    var db = require('../libs/lib_database');

    var Qry = function(){
        this.accountDb = null;
    };

    Qry.prototype.init = function (property){
        var self = this;
        self.accountDb = db.createObject({host : 'localhost', user:'root', password :'hyunchuel', database : 'account'});
    };

    Qry.prototype.test = function (){
        var self = this;
        var query = 'select * from ACCOUNT';
        self.accountDb.execute(query, function(err, data){
            if(err) return;
            console.dir(data);
        });
    };


    module.exports.Qry = function(){
        return new Qry();
    }
}
