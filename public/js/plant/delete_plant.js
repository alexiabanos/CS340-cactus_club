function deletePlant(plant_id) {
    let link = '/delete-plant/';
    link += plant_id;
    $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result) {
            deleteRow(plant_id);
        }
    })
}

function deleteRow(plant_id) {

    let table = document.getElementById("plants-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == plant_id) {
            table.deleteRow(i);
            deleteDropDownMenu(plant_id);
            break;
        }
    }
}

function deleteDropDownMenu(plant_id) {
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(plant_id)) {
            selectMenu[i].remove();
            break;
        }

    }
}