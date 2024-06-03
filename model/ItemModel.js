import { items  } from "../database/db.js";

export function getAllItems(){
    return items;
}

export function save(Item){
    items.push(Item);
}

export function remove(index){
    items.splice(index, 1);
}

export function update(index, item){
    items[index] = item;
}