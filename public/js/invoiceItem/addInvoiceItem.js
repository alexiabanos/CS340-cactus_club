// Get the objects we need to modify
let addInvoiceItemForm = document.getElementById('add-invoiceItem-form-ajax');

// Modify the objects we need
addInvoiceItemForm.addEventListener("submit", function(e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInvoiceItemFirst = document.getElementById("input-invoiceItem_first");
    let inputInvoiceItemLast = document.getElementById("input-invoiceItem_last");
    let inputHourlyRate = document.getElementById("input-hourly_rate");

    // Get the values from the form fields
    let invoiceItemFirstValue = inputInvoiceItemFirst.value;
    let invoiceItemLastValue = inputInvoiceItemLast.value;
    let hourlyRateValue = inputHourlyRate.value;

    // Put our data we want to send in a javascript object
    let data = {
        invoiceItem_first: invoiceItemFirstValue,
        invoiceItem_last: invoiceItemLastValue,
        hourly_rate: hourlyRateValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoiceItem-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputInvoiceItemFirst.value = '';
            inputInvoiceItemLast.value = '';
            inputHourlyRate.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("InvoiceItems-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let hourlyCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoiceItem_id;
    firstNameCell.innerText = newRow.invoiceItem_first;
    lastNameCell.innerText = newRow.invoiceItem_last;
    hourlyCell.innerText = newRow.hourly_rate;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deletePerson(newRow.invoiceItem_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(hourlyCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.invoiceItem_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Dropdown menu for updating invoiceItems

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.invoiceItem_first + ' ' + newRow.invoiceItem_last;
    option.value = newRow.id;
    selectMenu.add(option);

}