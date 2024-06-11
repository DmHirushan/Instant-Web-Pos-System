import { getAllItems, remove, save, update } from "../model/ItemModel.js";
import { loadDataIntoItemField } from '../controller/OrderController.js';

export { saveItem, deleteItem, updateItem, clearFields }

loadAllItems();

function loadAllItems(){
    loadNextItemCode();
    let items = getAllItems();
    for(let i=0; i<items.length; i++){
        reloadTable(items[i])
    }
}

function reloadTable(Item){
    // alert('kjhkds')
     // Get the table body element
    var tableBody = document.getElementById('item-table-body');

    // Create a new row
    var newRow = tableBody.insertRow();

    // Insert new cells in the new row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    // Add some text to the new cells
    cell1.innerHTML = Item.itemCode;
    cell2.innerHTML = Item.itemName;
    cell3.innerHTML = Item.itemQty;
    cell4.innerHTML = Item.itemPrice;
}

function clearTable() {
    let tableBody = document.getElementById('item-table-body');
    tableBody.innerHTML = "";
}

function loadNextItemCode(){
    let items = getAllItems();
    document.getElementById('ItemCode').value = genarateItemCode(items[items.length-1].itemCode);
}

function genarateItemCode(currentItemCode){
    let array = currentItemCode.split('I');
    if(array[1]++ < 9){
        return 'I00'+(array[1]);
    }else{
        return "I0"+(array[1])
    }
}

let itemCodeTextField = document.getElementById('ItemCode');
let itemNameTextField = document.getElementById('ItemName');
let itemQtyTextField = document.getElementById('ItemQty');
let unitPriceTextField = document.getElementById('UnitPrice');

function saveItem(){
    console.log('bdu wda');
    let itemCode = itemCodeTextField.value;
    let itemName = itemNameTextField.value;
    let itemQty = itemQtyTextField.value;
    let itemPrice = unitPriceTextField.value;
    if(validate(itemName,itemQty,itemPrice)){
        let Item = {
            itemCode : itemCode,
            itemName : itemName,
            itemQty : itemQty,
            itemPrice : itemPrice
        }
        save(Item);
        loadDataIntoItemField();
        clearTable();
        loadAllItems();
    }
    
}

function validate(itemName,itemQty,itemPrice){
    let itemNameValid = false;
    if(itemName === ''){
        itemNameTextField.placeholder = 'Item Name can not be empty!';
        itemNameTextField.style.width = '300px';
        itemNameTextField.style.border = '2px solid red';
        itemNameValid = false;
    }else if(/^[a-zA-Z\s]+$/.test(itemName)){
        itemNameValid = true;
    }else{
        itemNameTextField.placeholder = 'Item Name Invalid!';
        itemNameTextField.style.border = '2px solid red';
        itemNameValid = false;
    }

    let itemQtyValid = false;
    if(itemQty === ''){
        itemQtyTextField.placeholder = 'Item Quantity can not be empty!';
        itemQtyTextField.style.width = '347px';
        itemQtyTextField.style.border = '2px solid red';
        itemQtyValid = false;
    }else if(/^[1-9][0-9]*$/.test(itemQty)){
        itemQtyValid = true;
    }else{
        itemQtyTextField.placeholder = 'Item Quantity Invalid!';
        itemQtyTextField.style.border = '2px solid red';
        itemQtyValid = false;
    }

    let itemPriceValid = false;
    if(itemPrice === ''){
        unitPriceTextField.placeholder = 'Item Price can not be empty!';
        unitPriceTextField.style.width = '310px';
        unitPriceTextField.style.border = '2px solid red';
        itemPriceValid = false;
    }else if(/^\d+(\.\d{1,2})?$/.test(itemPrice)){
        itemPriceValid = true;
    }else{
        unitPriceTextField.placeholder = 'Item Price Invalid!';
        unitPriceTextField.style.border = '2px solid red';
        itemPriceValid = false;
    }
    if(itemNameValid === true && itemQtyValid === true && itemPriceValid === true){
        return true;
    }else{
        return false;
    }
}

function clearFields(){
    itemCodeTextField.value = "";
    itemNameTextField.value = "";
    itemQtyTextField.value  = "";
    unitPriceTextField.value = "";
}

function deleteItem(){
    let result =false;
    let items = getAllItems();
    for(let i=0; i<items.length; i++){
        if(itemCodeTextField.value === items[i].itemCode){
            console.log(itemCodeTextField.value)
            remove(i);
            result = true;
            clearTable();
            loadAllItems();
        }
    }
    if(result === false){
        alert('Something went wrong!');
    }
}

// function searchItem(){
//     let items = getAll();
//     console.log('atult enwa');
//     for(let i =0; i<items.length; i++){
//         if(itemCodeTextField.value === items[i].itemCode){
//             console.log('wde goda');
//         }
//     }
// }

document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('item-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        rows[i].addEventListener('click', function () {
            const cells = this.getElementsByTagName('td');
            document.getElementById('ItemCode').value = cells[0].innerText;
            document.getElementById('ItemName').value = cells[1].innerText;
            document.getElementById('ItemQty').value = cells[2].innerText;
            document.getElementById('UnitPrice').value = cells[3].innerText;
        });
    }
});

function updateItem(){
    let itemCode = document.getElementById('ItemCode').value;
    let items = getAllItems();
    let index = null;
    for(let i=0; i<items.length; i++){
        if(itemCode === items[i].itemCode){
            index = i;
            break;
        }
    }
    update(index, 
        {
            itemCode : document.getElementById('ItemCode').value,
            itemName : document.getElementById('ItemName').value,
            itemQty : document.getElementById('ItemQty').value,
            itemPrice : document.getElementById('UnitPrice').value
        }
    );
    clearFields();
    clearTable();
    loadAllItems();
}


