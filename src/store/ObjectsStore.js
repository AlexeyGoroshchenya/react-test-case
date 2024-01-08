import { makeAutoObservable } from "mobx"


export default class ObjectsStore {

constructor(){
    this._tags = [
     { name: "label1", id: 1 },
     { name: "label2", id: 2 },
     { name: "label3", id: 3 },
     { name: "label4", id: 4 },
     { name: "label5", id: 5 },
     { name: "something6", id: 6 },
     { name: "something7", id: 7 },
     { name: "something8", id: 8 },
     { name: "something9", id: 9 },
     { name: "something10", id: 10 },
    ]
    
    this._objectsCount = 0


    
    makeAutoObservable(this)
}

setTags(tags){
    this._tags = tags
}



setObjectsCount(objectsCount){
    this._objectsCount = objectsCount
}




get tags(){
    return  this._tags
}

get objectsCount(){
    return  this._objectsCount
}




}