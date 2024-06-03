import { getAll, remove, save, search, update } from '../model/CustomerModel.js';


clearTable();
loadAllCustomers();
loadDataIntoCustomerField();

export { saveCustomer, deleteCustomer, updateCustomer, clearFields };


function loadAllCustomers() {
    // nextCustomerId();
    let customers = getAll();
    customers.forEach(customer => {
        reloadTable(customer);
    });
}

function reloadTable(customer) {
    let tableBody = document.getElementById('customer-table-body');
    let newRow = tableBody.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);

    cell1.textContent = customer.cusId;
    cell2.textContent = customer.cusName;
    cell3.textContent = customer.cusAddress;
    cell4.textContent = customer.cusSalary;
}

function saveCustomer() {
    let id = document.getElementById('CustomerId').value;
    let name = document.getElementById('CustomerName').value;
    let address = document.getElementById('CustomerAddress').value;
    let salary = document.getElementById('CustomerSalary').value;

    let customer = {
        cusId: id,
        cusName: name,
        cusAddress: address,
        cusSalary: salary
    };

    save(customer);
    clearFields();
    nextCustomerId();
    clearTable();
    loadAllCustomers();
}

function clearFields(){
    document.getElementById('CustomerId').value = "";
    document.getElementById('CustomerName').value = "";
    document.getElementById('CustomerAddress').value = "";
    document.getElementById('CustomerSalary').value = "";
}

function clearTable() {
    let tableBody = document.getElementById('customer-table-body');
    tableBody.innerHTML = "";
}

function deleteCustomer() {
    let cusId = document.getElementById('CustomerId').value;
    let customers = getAll();

    for (let i = 0; i < customers.length; i++) {
        if (cusId === customers[i].cusId) {
            remove(i);
            break;
        }
    }
    clearTable();
    loadAllCustomers();
}

// function searchCustomer(){
//     let cusId = document.getElementById('CustomerId').value;
//     let customers = getAll();
//     let searchedCustomer = null;
    
//     for (let i = 0; i < customers.length; i++) {
//         if (cusId === customers[i].cusId) {
//             console.log('juhasud')
//             searchedCustomer = search(i);
//             // break;
//         }
//     }

//     if(searchedCustomer === null){
//         alert('There is no Customer on that ID!');
//     }else{

//         document.getElementById('CustomerName').value = searchedCustomer.cusName;
//         document.getElementById('CustomerAddress').value = searchedCustomer.cusAddress;
//         document.getElementById('CustomerSalary').value = searchedCustomer.cusSalary;
//     }
    
// }

function nextCustomerId(){
    let customers = getAll();
    document.getElementById('CustomerId').value = genarateCustomerID(customers[customers.length-1].cusId).toString();
}

function genarateCustomerID(cusId){
    let array = cusId.split('C');
    let nextCusId = parseInt(array[1], 10);
    if(nextCusId++ < 10){
        return 'C00'+ nextCusId;
    }else{
        return 'C0' + nextCusId;
    }

}

document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('customer-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        rows[i].addEventListener('click', function () {
            const cells = this.getElementsByTagName('td');
            document.getElementById('CustomerId').value = cells[0].innerText;
            document.getElementById('CustomerName').value = cells[1].innerText;
            document.getElementById('CustomerAddress').value = cells[2].innerText;
            document.getElementById('CustomerSalary').value = cells[3].innerText;
        });
    }
});

function updateCustomer(){
    let cusId = document.getElementById('CustomerId').value;
    let customers = getAll();
    let index = null;
    for(let i=0; i<customers.length; i++){
        if(cusId === customers[i].cusId){
            index = i;
            break;
        }
    }
    update(index, 
        {
            cusId : document.getElementById('CustomerId').value,
            cusName : document.getElementById('CustomerName').value,
            cusAddress : document.getElementById('CustomerAddress').value,
            cusSalary : document.getElementById('CustomerSalary').value
        }
    );
    clearFields();
    clearTable();
    loadAllCustomers();
}



function loadDataIntoCustomerField(){
    let customers = getAll();
    let field = document.getElementById('customer-select-field');
    for(let i=0; i<customers.length; i++){
        let option = document.createElement('option');
        // option.value = items[i].itemCode + " " + items[i].itemName;
        option.textContent = customers[i].cusId + " " + customers[i].cusName;
        field.appendChild(option);
    }
}