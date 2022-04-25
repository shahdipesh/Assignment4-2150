// CLASS: LinkedList
//
// Author: Dipesh Shah, 7882947
//
// REMARKS: This class implements a linked list.
//
//-----------------------------------------

let Node = require("./Node")
class LinkedList{
    constructor(){
        this._head = null;
        this._size = 0;
    }

    insert(node){//inserts a node at the top of the list
        if(this.top == null){
            this._head = node;
        }
        else{
           let dummy = new Node(node.key,node.value);
              dummy.next = this._head; 
              this._head = dummy;
        }
        this._size++;
    }

    get top(){
        return this._head;
    }

    get size(){
        return this._size;
    }

}

module.exports = LinkedList;