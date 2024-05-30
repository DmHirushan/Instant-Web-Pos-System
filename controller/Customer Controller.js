import { getAll, remove, save, search } from '../model/CustomerModel.js';


clearTable();
loadAllCustomers();


export { saveCustomer, deleteCustomer, searchCustomer };


function loadAllCustomers() {
    let customers = getAll();
    customers.forEach(customer => {
        reloadTable(customer);
    });
}

function reloadTable(customer) {
    let tableBody = document.getElementById('table-body');
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
    clearTable();
    loadAllCustomers();
}

function clearTable() {
    let tableBody = document.getElementById('table-body');
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

function searchCustomer(){
    let cusId = document.getElementById('CustomerId').value;
    let customers = getAll();
    let searchedCustomer = null;
    
    for(let i=0; i<customers.length; i++){
        if(cusId === customers[i].cusId){
            console.log('bduwda');
             searchedCustomer = search(i);
             break;
        }
    }

    if(searchedCustomer === null){
        alert('There is no Customer on that ID!');
    }else{

        document.getElementById('CustomerName').value = searchedCustomer.cusName;
        document.getElementById('CustomerAddress').value = searchedCustomer.cusAddress;
        document.getElementById('CustomerSalary').value = searchedCustomer.cusSalary;
    }
    
}


