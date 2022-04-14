class Hashable{

    constructor(){
    }
    //create abstract method hashVal
    hashVal(){
        throw new Error("Abstract method hashVal not implemented");
    }
    //create abstract method equals
    equals(other){
        throw new Error("Abstract method equals not implemented");
    }

}

module.exports = Hashable;