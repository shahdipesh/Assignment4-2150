
let Hashable = require('./Hashable');
class IntHash extends Hashable{
    constructor(num){
        super();
        this._num=num;
    }
   // hashVal function is the value of the integer
    hashVal(){
        return this._num;
    }
    
    equals(other){
        return this._num === other.num;
    }
    
    get num(){
        return this._num;
    }

}


module.exports = IntHash;