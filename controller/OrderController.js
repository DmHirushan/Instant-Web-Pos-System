import { getAllItems, update } from "../model/ItemModel.js";
import { getAllCustomers } from "../model/CustomerModel.js";
import { getAllOrders } from "../model/OrderModel.js";
import { saveOrder } from "../model/OrderModel.js";

// initialAlert();
loadDataIntoItemField();
loadDataIntoCustomerField();
autoFillOrderId();

function initialAlert(){
    alert('Welcome to Place Order Page!');
}


export function loadDataIntoItemField(){
    let items = getAllItems();
    let field = document.getElementById('item-select-field');
    field.innerHTML = '';
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


export function loadDataIntoCustomerField(){
    let field = document.getElementById('customer-select-field');
    field.innerHTML = '';
    let customers = getAllCustomers();  
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

function clearFields(){
    itemCodeTextField.value = "";
    itemNameTextField.value = "";
    itemPriceTextField.value = "";
    itemQtyTextField.value = "";
    orderQuantity.value = "";
}

let itemCodeTextField = document.getElementById('OrderSectionItemCode');
let itemNameTextField = document.getElementById('OrderSectionItemName');
let itemPriceTextField = document.getElementById('OrderSectionItemPrice');
let itemQtyTextField = document.getElementById('OrderSectionItemQty');
let orderQuantity = document.getElementById('OrderQuantity');


export function loadTable(){
    if(checkItemQty()){
        let table = document.getElementById('order-table');
        let rowsLength = table.rows.length;
        // findTotal();
        if(rowsLength > 1){
            console.log('atult awa..');
            checkItemAlreadyExists();
        }else{
            var tableBody = document.getElementById('order-table-body');
            var newRow = tableBody.insertRow();

            newRow.insertCell(0).innerHTML = itemCodeTextField.value;
            newRow.insertCell(1).innerHTML = itemNameTextField.value;
            newRow.insertCell(2).innerHTML = itemPriceTextField.value;
            newRow.insertCell(3).innerHTML = orderQuantity.value;
            newRow.insertCell(4).innerHTML = calculateOneItemTotal();
        }
        clearFields();
        findTotal();
    }else{
        alert('This much amount is not avilable in the Store!');
    }  

}

function checkItemQty(){
    let itemsArray = getAllItems();
    for(let i=0; i<itemsArray.length; i++){
        if(itemCodeTextField.value === itemsArray[i].itemCode){
            if(orderQuantity.value <= itemsArray[i].itemQty){
                console.log(itemsArray[i].itemQty - parseInt(orderQuantity.value, 10));
                itemsArray[i].itemQty = itemsArray[i].itemQty - parseInt(orderQuantity.value, 10);
                console.log(itemsArray);
                update(i, itemsArray[i]);
                return true;
            }
        }
    }
}

function calculateOneItemTotal(){
    return itemPriceTextField.value * orderQuantity.value;
}

function checkItemAlreadyExists(){
    let tableRowCount = document.getElementById('order-table').rows.length;
    let table = document.getElementById('order-table');
    let isExists = false;
    for(let i=1; i<tableRowCount; i++){
        if(itemCodeTextField.value === table.rows[i].cells[0].innerHTML){
            table.rows[i].cells[3].innerHTML =  parseInt(table.rows[i].cells[3].innerHTML, 10) + parseInt(orderQuantity.value, 10);
            table.rows[i].cells[4].innerHTML = parseInt(table.rows[i].cells[4].innerHTML,) + calculateOneItemTotal();
            isExists = true;
            break;
        }
    }
    if(!isExists){
        var tableBody = document.getElementById('order-table-body');
        var newRow = tableBody.insertRow();

        newRow.insertCell(0).innerHTML = itemCodeTextField.value;
        newRow.insertCell(1).innerHTML = itemNameTextField.value;
        newRow.insertCell(2).innerHTML = itemPriceTextField.value;
        newRow.insertCell(3).innerHTML = orderQuantity.value;
        newRow.insertCell(4).innerHTML = calculateOneItemTotal();
    }
}

function findTotal(){
    let tableRowCount = document.getElementById('order-table').rows.length;
    let table = document.getElementById('order-table');
    let total = 0;
    for(let i=1; i<tableRowCount; i++){
        total += parseInt(table.rows[i].cells[4].innerHTML, 10);
    }
    document.getElementById('TotalLabel').innerHTML = total;
    document.getElementById('SubTotalLabel').innerHTML = total;
}


document.getElementById('Cash').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculateBalance();
    }
});

function calculateBalance(){
    if(document.getElementById('Discount').value === ""){
        document.getElementById('Balance').value = document.getElementById('Cash').value - document.getElementById('TotalLabel').innerHTML;
    }else{
        decreaseDiscountFromTotal();
        document.getElementById('Balance').value = document.getElementById('Cash').value - document.getElementById('TotalLabel').innerHTML;
    }
    
}

function decreaseDiscountFromTotal(){
    document.getElementById('TotalLabel').innerHTML -=  parseInt(document.getElementById('TotalLabel').innerHTML, 10) * (splitDiscount((document.getElementById('Discount').value))/100);
}

function splitDiscount(discount){
    let array = discount.split('%');
    console.log(array);
    return array[0];
}

function clearCustomerDetailTextFields(){
    document.getElementById('OrderSectionOrderId').value = '';
    document.getElementById('OrderSectionCustomerId').value = '';
    document.getElementById('OrderSectionCustomerName').value = '';
    document.getElementById('OrderSectionCustomerSalary').value = '';
    document.getElementById('OrderSectionCustomerSalary').value = '';
}

export function save(){
    let orderId = document.getElementById('OrderSectionOrderId').value;
    let cusId = document.getElementById('OrderSectionCustomerId').value;
    let date = document.getElementById('date-picker').innerText;
    let subTotal = document.getElementById('SubTotalLabel').innerText;
    let total = document.getElementById('TotalLabel').innerText;

    let order = {
        orderId : orderId,
        cusId : cusId,
        date : date,
        subTotal : subTotal,
        total : total
    }
    saveOrder(order);
    clearCustomerDetailTextFields();
    alert('Order Purchased Successfully!');
}
