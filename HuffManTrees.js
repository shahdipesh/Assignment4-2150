// CLASS: HuffmanTree
//
// Author: Dipesh Shah, 7882947
//
// REMARKS: Defines the HuffmanTree class
//
//-----------------------------------------

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

    //------------------------------------------------------
    // combine
    //
    // PURPOSE:    Combines two HuffmanTrees into one
    // PARAMETER:tree
    //------------------------------------------------------
    combine(tree){
        let newRoot = new HuffManNode(null);
        newRoot.left = this._root;
        newRoot.right = tree._root;
        this._weight = this._weight + tree._weight;
        tree.weight=100;
        this._root = newRoot;
        tree.root=newRoot;
    }


    //compareTo method to compare two HuffmanTrees
    compareTo(tree){
        if(this._weight > tree._weight){  //parameter comes first
            return 1;
        }
        else if(this._weight < tree._weight){
            return -1;
        }
        else{
            //search for the rightmost node in the tree and compare them
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


    //find the node with the given value
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
         let pathArr = path(this._root,[])?path(this._root,[]):(node)?0:null;
         let pathString;
         if(pathArr){
            pathString = pathArr.join(" ");
         }
         else{
            pathString = null;
         }
        return {
            node,
            //path returns null means that the node we are searching is leaf so we return 0 if the node was found
            path: pathString?pathString:0
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


module.exports = HuffManTrees;