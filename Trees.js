let HuffManTrees = require('./HuffManTrees');
let StringHash = require('./StringHash');

class Trees{
    constructor(){
        this._trees=[];
    }

    //takes in Dictionary  and creates trees from nodes in the dictionary
    generateTrees(dictionary){
        for(let i=0;i<dictionary.size;i++){
            let current = dictionary.hashTable[i].top;
            while(current!=null){
                let tree = new HuffManTrees(current.key,current.value);
                this._trees.push(tree);
                current = current.next;
            }
        }
        this.sortTrees();
        return this._trees;
       
    }

    //sort trees by weight
    sortTrees(){
        this._trees.sort((a, b) => {
            if(a.weight==b.weight && a.value instanceof StringHash){
                return a.value.str.localeCompare(b.value.str);
            }

            return a.weight - b.weight;
        });
    }

}


module.exports = Trees;