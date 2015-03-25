{
    "use strict";
    var constructorModule = require('../libs/base_constructor');

    var SessionServer = function(){

    };
    SessionServer.prototype = new constructorModule.BaseConstructor();

    module.exports.SessionServer = function(){
        return new SessionServer();
    }

}
