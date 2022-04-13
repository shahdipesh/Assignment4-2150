let Dictionary = require("./Dictionary");
let StringHash = require("./StringHash");
let Node = require("./Node");
let Trees = require("./Trees");
const IntHash = require("./IntHash");


class Encoder{
    constructor(filename){
       //open the file passed in as a parameter
        this._path = filename;
    }
    
    encode(){
        let fs = require('fs');
        let content = fs.readFileSync(`${this._path}`, "utf8");   
        let frequencyTable = new Dictionary(10); 
        let totalChars =this.getTotalFrequency(frequencyTable,content);
        this.convertFrequencyToWeight(frequencyTable,totalChars);
        let tree = new Trees(frequencyTable);
        let trees = tree.generateTrees(frequencyTable); //array of trees
        
    }

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

    getTotalFrequency(frequencyTable,content){
        this.storeFrequency(frequencyTable,content);
        let total = 0;
        for(let i = 0; i < frequencyTable.size; i++){
            let current = frequencyTable.hashTable[i].top;
            while(current != null){
                total += current.value;
                current = current.next;
            }
        }
        return total;
    }

    convertFrequencyToWeight(frequencyTable,totalCharacters){
        for(let i = 0; i < frequencyTable.size; i++){
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