let HuffManTrees = require('./HuffManTrees');
let StringHash = require('./StringHash');

class Trees{
    constructor(){
        this._trees=[];
    }

    //takes in Dictionary  and creates trees from nodes in the dictionary
    generateTrees(dictionary){
        for(let i=0;i<dictionary.length;i++){
            let current = dictionary.hashTable[i].top;
            while(current!=null){
                let tree = new HuffManTrees(current.key,current.value);
                this._trees.push(tree);
                current = current.next;
            }
        }
        this.sortTrees(this._trees);
        return this._trees;
       
    }

    //sort trees by weight
    sortTrees(trees){
        trees.sort((a, b) => {
            if(a.weight==b.weight && a.value instanceof StringHash){
                return a.value.data.localeCompare(b.value.data);
            }
            return a.weight - b.weight;
        });
    }

}


module.exports = Trees;
