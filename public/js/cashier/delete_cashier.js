function deleteCashier(cashier_id) {
    let link = '/delete-cashier/';
    link += cashier_id;
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result) {
            deleteRow(cashier_id);
        }
    })
}

function deleteRow(cashier_id) {

    let table = document.getElementById("cashiers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == cashier_id) {
            table.deleteRow(i);
            deleteDropDownMenu(cashier_id);
            break;
        }
    }
}

function deleteDropDownMenu(cashier_id) {
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(cashier_id)) {
            selectMenu[i].remove();
            break;
        }

    }
}