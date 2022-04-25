// CLASS: Hashable
//
// Author: Dipesh Shah, 7882947
//
// REMARKS: This class is used to force methods to be implemented in the subclasses.
//
//-----------------------------------------
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