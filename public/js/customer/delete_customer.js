function deleteCustomer(customer_id) {
    let link = '/delete-customer/';
    link += customer_id;
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result) {
            deleteRow(customer_id);
        }
    })
}

function deleteRow(customer_id) {

    let table = document.getElementById("customers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == customer_id) {
            table.deleteRow(i);
            deleteDropDownMenu(customer_id);
            break;
        }
    }
}

function deleteDropDownMenu(customer_id) {
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(customer_id)) {
            selectMenu[i].remove();
            break;
        }

    }
}