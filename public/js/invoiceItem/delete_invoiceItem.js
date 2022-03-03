function deleteInvoiceItem(invoiceItem_id) {
    let link = '/delete-invoiceItem/';
    link += invoiceItem_id;
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result) {
            deleteRow(invoiceItem_id);
        }
    })
}

function deleteRow(invoiceItem_id) {

    let table = document.getElementById("invoiceItems-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == invoiceItem_id) {
            table.deleteRow(i);
            deleteDropDownMenu(invoiceItem_id);
            break;
        }
    }
}

function deleteDropDownMenu(invoiceItem_id) {
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(invoiceItem_id)) {
            selectMenu[i].remove();
            break;
        }

    }
}