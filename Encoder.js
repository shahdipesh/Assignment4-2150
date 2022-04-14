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
    
    encode(){
        let fs = require('fs');
        let content = fs.readFileSync(`${this._path}`, "utf8");   
        let frequencyTable = new Dictionary(10); 
        let minheap = new MinHeap();
        let totalChars =this.getTotalFrequency(frequencyTable,content);
        this.convertFrequencyToWeight(frequencyTable,totalChars);
        let tree = new Trees(frequencyTable);
        let trees = tree.generateTrees(frequencyTable); //array of trees
        this.insertTrees(trees,minheap);   
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


    storeFrequency(frequency,content){
        console.log(content)
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

let encode = new Encoder("./README.txt");
encode.encode();




module.exports = Encoder;