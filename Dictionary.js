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

    get(key){
        //get key from the array
        let index = key.hashVal() % this._hashTable.length;
        let list = this._hashTable[index];
        let current = list.top;
        //if contains then return the value
        if(this.contains(key)){
            return current.value;
        }
        else{
            return undefined;
        }
       
    }

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

    isEmpty(){
        return this._size === 0;
    }
    get hashTable(){
        return this._hashTable;
    }

    get size(){
        return this._size;
    }

    get length(){
        return this._length;
    }
}


let key1 = new IntHash(1);
let key2 = new IntHash(2);
let key3 = new IntHash(2);


let dictionary = new Dictionary(10);
dictionary.put(key1, "\n");
// dictionary.put(key2, "two");
// dictionary.put(key3, "three");






module.exports = Dictionary;