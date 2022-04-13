class HuffManNode{
    constructor(val){
        if(arguments.length === 1){
        this._val = val;
        }
        else{
            this._val= null;
        }
        this._left = null;
        this._right = null;
        
    }

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