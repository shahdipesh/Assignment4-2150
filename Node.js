const Hashable = require("./Hashable");
class Node{
    constructor(key,value){
        if(arguments[0] instanceof Hashable){
        this._key = key;
        }
        else{
            throw new Error("Key must be a Hashable");
        }
        this._value = value;
        this._next = null;
    }
    
    get key(){
        return this._key;
    }

    set value(value){
        this._value = value;
    }

    get value(){
        return this._value;
    }

    get next(){
        return this._next;
    }

    set next(node){
        this._next = node;
    }

    equals(other){
        return this._key===other.key
    }

}

module.exports = Node;