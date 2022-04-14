
let Hashable = require('./Hashable');
class IntHash extends Hashable{
    constructor(data){
        super();
        this._data=data;
    }
   // hashVal function is the value of the integer
    hashVal(){
        return this._data;
    }
    
    equals(other){
        return this._data === other.data;
    }
    
    get data(){
        return this._data;
    }

}


module.exports = IntHash;