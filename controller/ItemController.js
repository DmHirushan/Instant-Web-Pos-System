import { getAll } from "../model/ItemModel.js"

getAllItems();

function getAllItems(){
    let items = getAll();
    for(let i=0; i<items.length; i++){
        reloadTable(items[i])
    }
}

function reloadTable(Item){
    // alert('kjhkds')
     // Get the table body element
    var tableBody = document.getElementById('table-body')

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