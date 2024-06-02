import { getAll, remove, save, update } from "../model/ItemModel.js"

export { saveItem, deleteItem, updateItem, clearFields }

getAllItems();

function getAllItems(){
    loadNextItemCode();
    let items = getAll();
    console.log(items);
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
    let items = getAll();
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
    let Item = {
        itemCode : itemCodeTextField.value,
        itemName : itemNameTextField.value,
        itemQty : itemQtyTextField.value,
        itemPrice : unitPriceTextField.value
    }
    save(Item);
    clearTable();
    getAllItems();
}

function clearFields(){
    itemCodeTextField.value = "";
    itemNameTextField.value = "";
    itemQtyTextField.value  = "";
    unitPriceTextField.value = "";
}

function deleteItem(){
    let result =false;
    let items = getAll();
    for(let i=0; i<items.length; i++){
        if(itemCodeTextField.value === items[i].itemCode){
            console.log(itemCodeTextField.value)
            remove(i);
            result = true;
            clearTable();
            getAllItems();
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
    let items = getAll();
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
    getAllItems();
}