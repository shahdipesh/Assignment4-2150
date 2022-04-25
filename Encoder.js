// CLASS: Encoder
//
// Author: Dipesh Shah, 7882947
//
// REMARKS: Define a class Encoder that reads a file and encodes it into a huffman sequence
//
//-----------------------------------------

let Dictionary = require("./Dictionary");
let StringHash = require("./StringHash");
let Node = require("./Node");
let Trees = require("./Trees");
const IntHash = require("./IntHash");
const MinHeap = require("./MinHeap");
const HuffManTrees = require("./HuffManTrees");


class Encoder{
    constructor(filename){
       //open the file passed in as a parameter
        this._path = filename;
    }


    //------------------------------------------------------
    // encode
    //
    // PURPOSE:   Encodes the file into huffman sequence
    //------------------------------------------------------
    encode(){
        let fs = require('fs');
        let content = fs.readFileSync(`${this._path}`, "utf8");  //read the file
        let frequencyTable = new Dictionary(10); //create a dictionary to store the frequency of each character
        let minheap = new MinHeap(); //create a minheap to store the nodes
        let totalChars =this.getTotalFrequency(frequencyTable,content);//get the total frequency of each character
        this.convertFrequencyToWeight(frequencyTable,totalChars);//convert the frequency to weight
        let tree = new Trees(frequencyTable);//create a tree
        let trees = tree.generateTrees(frequencyTable); //array of trees
        this.insertTrees(trees,minheap);   //insert the trees into the minheap
        //this block takes 2 small trees at a time and combines them into a larger tree and inserts it into the minheap again
        while (minheap.size>1) {
            let tree1 = minheap.remove();
            let tree2 = minheap.remove();
            tree1.combine(tree2);
            minheap.insert(tree1);
        }
        //Now meanheap's 0th index contains the root of the huffman tree

        //write the path to each character to the output file
       this.writeToFile(trees,minheap.heap[0]);
    }


    //writes the path to each character to the output file
    writeToFile(trees,root){
        let fs = require('fs');
        let file = fs.createWriteStream("./output.huff");
        for(let i=0; i<trees.length; i++){
            let valueToWrite;
            if(trees[i]._value instanceof StringHash){
                valueToWrite = trees[i].value.data;
            }
            else{
                valueToWrite = trees[i].value.data;
            }
   
             file.write(`${valueToWrite} ${root.find(valueToWrite).path}\n`);
        
        }
    }

    //insert trees from array into min_heap
    insertTrees(trees,minheap){
        for(let i=0;i<trees.length;i++){
            minheap.insert(trees[i]);
        }
    }

//store the frequency of each character in the frequency table
    storeFrequency(frequency,content){
        for(let i = 0; i < content.length; i++){
            let char = content[i];
            let hash;
            if(parseInt(char)){
                hash = new IntHash(char);
            }
            else{
                hash = new StringHash(char);
            }
            if(frequency.contains(hash)){
                frequency.search(hash).value+=1;
            }
            else{
                frequency.put(hash,1);
            }
        }
    }

    //get the total number of characters in the file
    getTotalFrequency(frequencyTable,content){
        this.storeFrequency(frequencyTable,content);
        let total = 0;
        for(let i = 0; i < frequencyTable.length; i++){
            let current = frequencyTable.hashTable[i].top;
            while(current != null){
                total += current.value;
                current = current.next;
            }
        }
        return total;
    }

    //convert the frequency to weight
    convertFrequencyToWeight(frequencyTable,totalCharacters){
        for(let i = 0; i < frequencyTable.length; i++){
            let current = frequencyTable.hashTable[i].top;
            while(current != null){
               current.value = current.value/totalCharacters;
               current = current.next;
            }
        } 
    }

    
}



module.exports = Encoder;