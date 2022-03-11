/*function getData(invoiceItem_id) {
    // Put our data we want to send in a javascript object
    let data = {
        invoiceItem_id: invoiceItem_id,
        invoice_id: invoice_id,
        plant_id: plant_id,
        plant_quantity: plant_quantity
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-invoiceItemForm-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 204) {

                // Add the new data to the table
                deleteRow(invoiceItem_id);
                window.location.reload();

            } else if (xhttp.readyState == 4 && xhttp.status != 204) {
                console.log("There was an error with the input.")
            }
        }
        // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}*/

// Get the objects we need to modify
let updateInvoiceForm = document.getElementById('update-invoiceItem-form-ajax');

// Modify the objects we need
updateInvoiceForm.addEventListener("submit", function(e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInvoiceItemId = document.getElementById("input-invoiceItem_id-update");
    let inputInvoiceId = document.getElementById("input-invoice_id-update");
    let inputPlantId = document.getElementById("input-plant_id-update");
    let inputPlantQuantity = document.getElementById("input-plant_quantity-update");

    // Get the values from the form fields
    let invoiceItemIDValue = inputInvoiceItemId.value;
    let invoiceIDValue = inputInvoiceId.value;
    let plantIDValue = inputPlantId.value;
    let plantQuantityValue = inputPlantQuantity.value;

    // Plant quantity can't be null
    if (isNaN(plantQuantityValue)) {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        invoiceItem_id: invoiceItemIDValue,
        invoice_id: invoiceIDValue,
        plant_id: plantIDValue,
        plant_quantity: plantQuantityValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-invoiceItem-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, plantQuantityValue);
            window.location.reload();

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})


function updateRow(data, invoiceItem_id) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("invoiceItems-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        console.log(table.rows[i].getAttribute('data-value'));
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute('data-value') == invoiceItem_id) {

            // Get the location of the row where we found the matching invoiceItem ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of invoice id value
            td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign invoice id to our value we updated to
            td.innerHTML = parsedData[0].invoice_id;

            // Get td of plant id value
            td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign plant id to our value we updated to
            td.innerHTML = parsedData[0].plant_id;

            // Get td of plantQuantity value
            td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign plantQuantity to our value we updated to
            td.innerHTML = parsedData[0].plant_quantity;
        }
    }
}

function updateModal(data, invoiceItem_id) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("invoiceItems-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        console.log(table.rows[i].getAttribute('data-value'));
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute('data-value') == invoiceItem_id) {

            // Get the location of the row where we found the matching invoiceItem ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of plantQuantity value
            td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign plantQuantity to our value we updated to
            td.innerHTML = parsedData[0].plant_quantity;
        }
    }
}