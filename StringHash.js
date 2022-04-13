let Hashable = require('./Hashable');
class StringHash extends Hashable{

    constructor(str){
        super();
        this._str = str;
    }
    // hashVal function is the value of the string
    hashVal(){
        let hash = 0;
        let prime = 13;
        let currPower = this._str.length-1;
        for(let i = 0; i < this._str.length; i++){
            hash += this._str.charCodeAt(i)*(Math.pow(prime,currPower));
        }
        return hash;
    }
    
    equals(other){
        return this._str.localeCompare(other.str) === 0;
    }

    get str(){
        return this._str;
    }
    
}

module.exports = StringHash;