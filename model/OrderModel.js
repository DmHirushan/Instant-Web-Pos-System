import { orders } from "../database/db.js";


export function getAllOrders(){
    return orders;
}

export function saveOrder(order){
    console.log('order', order);
    orders.push(order);
}