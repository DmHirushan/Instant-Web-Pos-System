import { getAllCustomers } from '../model/CustomerModel.js';


function loadAllCustomers(){
    alert('kjhkds')
    let customers = getAllCustomers()
    
    for(let i=0; i<customers.length; i++){
        reloadTable(customers[i])
    } 
}

function reloadTable(){
    alert('kjhkds')
     // Get the table body element
    var table = document.getElementsByTagName('table').getElementsByTagName('tbody')[0];

    // Create a new row
    var newRow = table.insertRow();

    // Insert new cells in the new row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    // Add some text to the new cells
    cell1.innerHTML = 'jekjfkji';
    cell2.innerHTML = customer.cusName;
    cell3.innerHTML = customer.cusAddress;
    cell4.innerHTML = customer.cusSalary;
}

reloadTable()