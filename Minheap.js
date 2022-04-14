class MinHeap{
    constructor(){
        this._heap = [];
        this._size = 0;
    }

    //inserts a Huffmantree into the heap
    insert(tree){
        this._heap.push(tree);
        this._size++;
        this.heapifyUp(this._size-1);
    }

    //returns the root of the heap
    get root(){
        return this._heap[0];
    }

    //returns the size of the heap
    get size(){
        return this._size;
    }

    //returns the index of the parent of the node at index i
    getParent(i){
        return Math.floor((i-1)/2);
    }

    //returns the index of the left child of the node at index i
    getLeftChild(i){
        return 2*i+1;
    }

    //returns the index of the right child of the node at index i
    getRightChild(i){
        return 2*i+2;
    }

    //returns the index of the smallest child of the node at index i
    getSmallestChild(i){
        let left = this.getLeftChild(i);
        let right = this.getRightChild(i);
        if(left >= this._size){
            return null;
        }
        else if(right >= this._size){
            return left;
        }
        //left comes first
        else  if(this._heap[right].compareTo(this._heap[left])==1){
            return left;
        }
        else{
            return right;
        }
    }

    //swaps the node at index i with its smallest child
    heapifyDown(i){
        let smallest = this.getSmallestChild(i);
        if(smallest !== null){
            //right comes first
            if(this._heap[i].compareTo(this._heap[smallest])==1){
                let temp = this._heap[i];
                this._heap[i] = this._heap[smallest];
                this._heap[smallest] = temp;
                this.heapifyDown(smallest);
            }
        }
    }

    //swaps the node at index i with its parent
    heapifyUp(i){
        let parent = this.getParent(i);
        if(parent >= 0){
            if(this._heap[parent].compareTo(this._heap[i])==1){
                let temp = this._heap[i];
                this._heap[i] = this._heap[parent];
                this._heap[parent] = temp;
                this.heapifyUp(parent);
            }
        }
    }

    //removes the root of the heap
    remove(){
        if(this._size === 0){
            return null;
        }
        let temp = this._heap[0];
        this._heap[0] = this._heap[this._size-1];
        this._heap.pop();
        this._size--;
        this.heapifyDown(0);
        return temp;
    }

    //returns the heap as an array
    toArray(){
        return this._heap;
    }

    get heap(){
        return this._heap;
    }

}

module.exports = MinHeap;