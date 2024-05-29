import { getAllCustomers, save } from '../model/CustomerModel.js';

loadAllCustomers()

function loadAllCustomers(){
    let customers = getAllCustomers()
    
    for(let i=0; i<customers.length; i++){
        reloadTable(customers[i])
    } 
}

function reloadTable(customer){
    // alert('kjhkds')
     // Get the table body element
    // var table = document.getElementsByClassName('.table')
    var tableBody = document.getElementById('table-body')

    // Create a new row
    var newRow = tableBody.insertRow();

    // Insert new cells in the new row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    // Add some text to the new cells
    cell1.innerHTML = customer.cusId;
    cell2.innerHTML = customer.cusName;
    cell3.innerHTML = customer.cusAddress;
    cell4.innerHTML = customer.cusSalary;
}

export function saveCustomer(){
    let id = document.getElementById('CustomerId').value;
    let name = document.getElementById('CustomerName').value;
    let address = document.getElementById('CustomerAddress').value;
    let salary = document.getElementById('CustomerSalary').value;

    let Customer = {
        cusId : id,
        cusName : name,
        cusAddress : address,
        cusSalary : salary
    }
    save(Customer)
    loadAllCustomers()
    alert('badu wada')
}
