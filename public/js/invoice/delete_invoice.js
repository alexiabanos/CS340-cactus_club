function deleteInvoice(invoice_id) {
    let link = '/delete-invoice/';
    link += invoice_id;
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result) {
            deleteRow(invoice_id);
        }
    })
}

function deleteRow(invoice_id) {

    let table = document.getElementById("invoices-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == invoice_id) {
            table.deleteRow(i);
            deleteDropDownMenu(invoice_id);
            break;
        }
    }
}

function deleteDropDownMenu(invoice_id) {
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(invoice_id)) {
            selectMenu[i].remove();
            break;
        }

    }
}