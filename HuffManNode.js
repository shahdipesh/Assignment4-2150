// CLASS: HuffManNode
//
// Author: Dipesh Shah, 7882947
//
// REMARKS: This class is used to create a node for the Huffman tree.
//
//-----------------------------------------

class HuffManNode{

    constructor(val){
        //if a value is passed in, create a leaf node with that value
        if(arguments.length === 1){
        this._val = val;
        }
        else{
            this._val= null;
        }
        this._left = null;
        this._right = null;
        
    }

    //getters and setters for values
    get val(){
        return this._val;
    }
    set val(val){
        this._val = val;
    }

    get left(){
        return this._left;
    }
    set left(node){
        this._left = node;
    }

    get right(){
        return this._right;
    }
    set right(node){
        this._right = node;
    }
    

}


module.exports = HuffManNode;