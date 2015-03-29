{
    "use strict";
    var crypto = require('crypto');


    var ConsistentHashing = function(){
        this.replicas = 40;
        this.hashType = 'md5';
        this.ring = {};
        this.keys = [];
    }

    ConsistentHashing.prototype.addNode = function(node){
        var self = this, key;

        for(var i=0; i< self.replicas; i++){
            key = crypto.createHash(self.hashType).update(node._key+":"+i).digest('hex');
            self.ring[key] = node;
            self.keys.push(key);
        };
        self.ring.sort();
    }


    ConsistentHashing.prototype.getNode = function(key){
        var self = this;


        self.findNodePos(key);

    }


    ConsistentHashing.prototype.findNodePos = function(){

    }


    ConsistentHashing.prototype.removeNode = function(){

    }

    module.exports.ConsistentHashing = function(){
        return new ConsistentHashing();
    }
}
