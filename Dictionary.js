// CLASS: Dictionary
//
// Author: Dipesh Shah, 7882947
//
// REMARKS: Class to define a dictionary
//
//-----------------------------------------


const Hashable = require("./Hashable");
const IntHash = require("./IntHash");
const StringHash = require("./StringHash");
const LinkedList = require("./LinkedList");
const Node = require("./Node");

class Dictionary{
    constructor(size){
        this._hashTable = new Array(size);
        //for each element in the array, set it to new LinkedList
        for(let i = 0; i < this._hashTable.length; i++){
            this._hashTable[i] = new LinkedList();
        }
        this._size = 0;
        this._length=size; //number of array index in Dictionary
    }

    //inserts a key-value pair into the dictionary
    put(key, value){
        if(key instanceof Hashable){
            let hash = key.hashVal();
            let index = hash % this._hashTable.length;
            let node = new Node(key,value);
            if(this.contains(key)){
               this.search(key).value = value;
            }
            else{
                this._hashTable[index].insert(node);
                this._size++;
            }
        }
        else{
            throw new Error("Key must be a Hashable");
        }
}

    //returns the value associated with the key
    get(key){
        //get key from the array
        let index = key.hashVal() % this._hashTable.length;
        let list = this._hashTable[index];
        let current = list.top;
        //if contains then return the value
        if(this.contains(key)){
           //loop through the linked list to find the key
           while(current != null){
               if(current.key.equals(key)){
                   return current.value;
               }
               current = current.next;
           }
        }
        else{
            return undefined;
        }
       
    }

    //returns true if the dictionary contains the key
    search(key){
        let index = key.hashVal() % this._hashTable.length;
        let list = this._hashTable[index];
        let current = list.top;
        while(current != null){
            if(current.key.equals(key)){
                return current;
            }
            current = current.next;
        }
        return null;
       
    }

    //returns true if the dictionary contains the key
    contains(key){
        let index = key.hashVal() % this._hashTable.length;
        let list = this._hashTable[index];
        let current = list.top;
        while(current != null){
            if(current.key.equals(key)){
                return true;
            }
            current = current.next;
        }
        return false;
    }

    //checks if the dictionary is empty
    isEmpty(){
        return this._size === 0;
    }

    //returns the hash table
    get hashTable(){
        return this._hashTable;
    }

    //returns the size of the dictionary
    get size(){
        return this._size;
    }

    //returns the length of the dictionary
    get length(){
        return this._length;
    }
}







module.exports = Dictionary;