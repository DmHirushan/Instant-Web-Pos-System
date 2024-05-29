import { customers } from '../database/db.js'

export function getAllCustomers(){
    return customers;
}

export function save(Customer){
    customers.push(Customer)
}