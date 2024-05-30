import { customers } from '../database/db.js'

export function getAll(){
    return customers;
}

export function save(Customer){    
    customers.push(Customer);
}

export function remove(index){
    customers.splice(index, 1);
}

export function search(index){
    return customers[index];
}