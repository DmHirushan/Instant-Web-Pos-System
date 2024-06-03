import { getAllItems } from "../model/ItemModel.js";
import { getAllCustomers } from "../model/CustomerModel.js";
import { getAllOrders } from "../model/OrderModel.js";

loadDataIntoItemField();
loadDataIntoCustomerField();
autoFillOrderId();

function loadDataIntoItemField(){
    let items = getAllItems();
    let field = document.getElementById('item-select-field');
    for(let i=0; i<items.length; i++){
        let option = document.createElement('option');
        // option.value = items[i].itemCode + " " + items[i].itemName;
        option.textContent = items[i].itemCode + " " + items[i].itemName;
        field.appendChild(option);
    }

    field.addEventListener('change', function() {
        let itemCode = splitItemCodeFromFieldValue(field.options[field.selectedIndex].text);
        // let items = getAllItems();
        let selectedItem = null;
        for(let i=0; i<items.length; i++){
            if(itemCode === items[i].itemCode){
                selectedItem = items[i];
            }
        }
        console.log(selectedItem);
        document.getElementById('OrderSectionItemCode').value = selectedItem.itemCode;
        document.getElementById('OrderSectionItemName').value = selectedItem.itemName;
        document.getElementById('OrderSectionItemPrice').value = selectedItem.itemPrice;
        document.getElementById('OrderSectionItemQty').value = selectedItem.itemQty;

        
    });

}

function splitItemCodeFromFieldValue(value){
    let array = value.split(" ");
    console.log(array[0]);
    return array[0];
}


function loadDataIntoCustomerField(){
    let customers = getAllCustomers();
    let field = document.getElementById('customer-select-field');
    for(let i=0; i<customers.length; i++){
        let option = document.createElement('option');
        // option.value = items[i].itemCode + " " + items[i].itemName;
        option.textContent = customers[i].cusId + " " + customers[i].cusName;
        field.appendChild(option);
    }

    field.addEventListener('change', function() { 
        let selectedCustomer = null;
        for(let i=0; i<customers.length; i++){
            if(splitItemCodeFromFieldValue(field.options[field.selectedIndex].text) === customers[i].cusId){
                selectedCustomer = customers[i];
            }
        }
        console.log(selectedCustomer);
        document.getElementById('OrderSectionCustomerId').value = selectedCustomer.cusId;
        document.getElementById('OrderSectionCustomerName').value = selectedCustomer.cusName;
        document.getElementById('OrderSectionCustomerSalary').value = selectedCustomer.cusSalary;
        document.getElementById('OrderSectionCustomerAddress').value = selectedCustomer.cusAddress;
    })
}


function autoFillOrderId(){
    let orders = getAllOrders();
    let currentOrderId = null;
    if(orders.length === 0){
        document.getElementById('OrderSectionOrderId').value = 'Or001';
    }else{
        currentOrderId = orders[orders.length-1].orderId;
        document.getElementById('OrderSectionOrderId').value = generateNextOrderId(currentOrderId);
    }
    
}

function generateNextOrderId(currentOrderId){
    let array = currentOrderId.split('r');
    return 'Or' + array[1]++;
}

let itemCodeTextField = document.getElementById('OrderSectionItemCode');
let itemNameTextField = document.getElementById('OrderSectionItemName');
let itemPriceTextField = document.getElementById('OrderSectionItemPrice');
let itemQtyTextField = document.getElementById('OrderSectionItemQty');
let orderQuantity = document.getElementById('OrderQuantity');


export function loadTable(){

    checkItemAlreadyExists();

    var tableBody = document.getElementById('order-table-body');
    var newRow = tableBody.insertRow();

    newRow.insertCell(0).innerHTML = itemCodeTextField.value;
    newRow.insertCell(1).innerHTML = itemNameTextField.value;
    newRow.insertCell(2).innerHTML = itemPriceTextField.value;
    newRow.insertCell(3).innerHTML = orderQuantity.value;
    newRow.insertCell(4).innerHTML = calculateOneItemTotal();

}

function calculateOneItemTotal(){
    return itemPriceTextField.value * orderQuantity.value;
}

function checkItemAlreadyExists(){
    let tableRowCount = document.getElementById('order-table').rows.length;
    console.log(tableRowCount);
    for(let i=0; i<tableRowCount; i++){
        if(itemCodeTextField.value === ){

        }
    }
}