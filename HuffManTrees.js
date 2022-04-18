let HuffManNode = require("./HuffManNode");
let Node = require("./Node");
let StringHash = require("./StringHash");
let IntHash = require("./IntHash");
let Dictionary = require("./Dictionary");

class HuffManTrees{
    constructor(char,weight){
        this._value = char;
        this._root = new HuffManNode(char);
        this._weight = weight;
    }

    combine(tree){
        let newRoot = new HuffManNode(null);
        newRoot.left = this._root;
        newRoot.right = tree._root;
        this._weight = this._weight + tree._weight;
        tree.weight=100;
        this._root = newRoot;
        tree.root=newRoot;
    }


    compareTo(tree){
        if(this._weight > tree._weight){  //parameter comes first
            return 1;
        }
        else if(this._weight < tree._weight){
            return -1;
        }
        else{
            //search for the leftmost node in the tree and compare them
            let leftmost = (node) => {
                if(node.left === null){
                    return node;
                }
                else{
                    return leftmost(node.left);
                }
            }
            let rightMost = (node) => {
                if(node.right === null){
                    return node;
                }
                else{
                    return rightMost(node.right);
                }
            }
            let rightMost1 = rightMost(this._root);
            let rightMost2 = rightMost(tree._root);
            if(rightMost1.val.data > rightMost2.val.data){
                return 1;
            }
            else if(rightMost1.val.data < rightMost2.val.data){
                return -1;
            }
            else{
                return 0;
            }
        }
    }


    find(char){
       //return the node if it exists 
         let search = (node) => {
             let data;
             if(node.val && node.val instanceof StringHash){
                    data = node.val.data;
             }
             else if(node.val instanceof IntHash){
                    data = node.val.data;
                }
            if(data === char){
                return node;
            }
            else if(node.left === null && node.right === null){
                return null;
            }
            else {
                let leftSearch = search(node.left);
                let rightSearch = search(node.right);
                return leftSearch || rightSearch;
            }
        }

        //find path to a leaf node and return the path
        let path = (node,arr) => {
           if(node.value === char) {
                return arr;
           }
           if(node.left === null && node.right === null){
                return null;
           }
           if(node.left.val === char) {
                arr.push("0");
                return arr;
           }
             else if(node.right.val === char) {
                arr.push("1");
                return arr;
           }
           else{
               if(search(node.left) !== null){
                arr.push("0");
                path(node.left,arr);
               }
                else if(search(node.right) !== null){
                arr.push("1");
                path(node.right,arr);
                }
                
           }
           return arr;

        }
        let node=search(this._root);
        return {
            node,
            //path returns null means that the node we are searching is leaf so we return 0 if the node was found
            //remove comma from toString to see the path
            path: path(this._root,[])?path(this._root,[]):(node)?0:null
        }
    }


    get root(){
        return this._root;
    }
    set root(node){
        this._root = node;
    }
        
    get weight(){
        return this._weight;
    }
    set weight(weight){
        this._weight = weight;
    }

    get value(){
        return this._value;
    }
    
}

// let data = "TOBERNHAIS"
// let vals = [0.21428571428571427,0.14285714285714285,0.10714285714285714,0.10714285714285714,0.03571428571428571,0.10714285714285714,0.07142857142857142,0.14285714285714285,0.03571428571428571,0.03571428571428571];
// let key1 = new StringHash('T');
// let key2 = new StringHash('O');
// let key3 = new StringHash('B');
// let key4 = new StringHash('E');
// let key5 = new StringHash('R');
// let key6 = new StringHash('N');
// let key7 = new StringHash('H');
// let key8 = new StringHash('A');
// let key9 = new StringHash('I');
// let key10 = new StringHash('S');

// let d = new Dictionary(10);
// d.put(key1,0.21428571428571427);
// d.put(key2,0.14285714285714285);
// d.put(key3,0.10714285714285714);
// d.put(key4,0.10714285714285714);
// d.put(key5,0.03571428571428571);
// d.put(key6,0.10714285714285714);
// d.put(key7,0.07142857142857142);
// d.put(key8,0.14285714285714285);
// d.put(key9,0.03571428571428571);
// d.put(key10,0.03571428571428571);

// let tree1 = new HuffManTrees('T',0.07142857142857142);
// let tree2 = new HuffManTrees('O',0.14285714285714285);
// let tree3 = new HuffManTrees('B',0.10714285714285714);
// let tree4 = new HuffManTrees('E',0.10714285714285714);
// let tree5 = new HuffManTrees('R',0.03571428571428571);
// let tree6 = new HuffManTrees('N',0.10714285714285714);
// let tree7 = new HuffManTrees('H',0.14285714285714285);
// let tree8 = new HuffManTrees('A',0.03571428571428571);
// let tree9 = new HuffManTrees('I',0.03571428571428571);
// let tree10 = new HuffManTrees('S',0.07142857142857142);

// //merge I and R
// tree9.combine(tree5); 

// //merge S and H
// tree10.combine(tree7);

// //merge I and R and B
// tree9.combine(tree3);

// //Join E and S,H
// tree4.combine(tree10);

// //Join N and A
// tree6.combine(tree8);

// //Join O and I,R,B
// tree2.combine(tree9);

// //Join E,S,H and T
// tree4.combine(tree1);

// //Join N,A and O,I,R,B
// tree6.combine(tree2);

// //Join E,S,H,T and N,A,O,I,R,B
// tree4.combine(tree6);

// console.log("---",tree6.search("R"));


module.exports = HuffManTrees;