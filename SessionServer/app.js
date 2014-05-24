var http = require('http');
var qry = require('./qry');


var dbQry = qry.Qry();
var property = {};
dbQry.init(property);
dbQry.test();


