/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
PORT = 9157;

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import express-handlebars
const { NULL } = require('mysql/lib/protocol/constants/types');
app.engine('.hbs', engine({
    defaultLayout: 'main',
    extname: ".hbs"
})); // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Add/Update/Delete Setup
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public')); // this is needed to allow for the form to use the ccs style sheet/javscript

// GET Requests
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/Cashiers', (req, res) => {
    let query1 = "SELECT * FROM Cashiers;"; // Define our query

    db.pool.query(query1, function(error, rows, fields) { // Execute the query

            res.render('Cashiers', { data: rows }); // Render the Cashiers.hbs file, and also send the renderer
        }) // an object where 'data' is equal to the 'rows'
});

app.get('/Customers', (req, res) => {
    let query1 = "SELECT * FROM Customers;"; // Define our query

    db.pool.query(query1, function(error, rows, fields) { // Execute the query

            res.render('Customers', { data: rows }); // Render the Customers.hbs file, and also send the renderer
        }) // an object where 'data' is equal to the 'rows'
});

app.get('/Plants', (req, res) => {
    let query3 = "SELECT * FROM Plants;"; // Define our query

    db.pool.query(query3, function(error, rows, fields) { // Execute the query

            res.render('Plants', { data: rows }); // Render the Plants.hbs file, and also send the renderer
        }) // an object where 'data' is equal to the 'rows'
});

app.get('/Invoices', (req, res) => {
    
        // Declare Query 1
        let query1;
    
        // If there is no query string, we just perform a basic SELECT
        if (req.query.invoice_id === undefined)
        {
            query1 = "SELECT * FROM Invoices;";
        }
    
        // If there is a query string, we assume this is a search, and return desired results
        else
        {
            query1 = `SELECT * FROM Invoices WHERE invoice_id LIKE "${req.query.invoice_id}%"`
        }
    
        // Query 2
        let query2 = "SELECT * FROM Customers;";
    
        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){
            
            // Save the invoices
            let invoices = rows;
            
            // Run the second query
            db.pool.query(query2, (error, rows, fields) => {
                
                // Save the customers
                let customers = rows;
    
                // Construct an object for reference in the table
                // Array.map is awesome for doing something with each
                // element of an array.
                let customermap = {}
                customers.map(customer => {
                    let customer_id = parseInt(customer.customer_id, 10);
    
                    customermap[customer_id] = customer["cutomer_last"];
                })
    
                // Overwrite the customer ID with the name of the customer in the invoices object
                invoices = invoices.map(invoice => {
                    return Object.assign(invoice, {customer: customermap[invoice.customer_last]})
                })
    
                return res.render('Invoices', {data: invoices, customers: customers});
            })
        })
    });

app.get('/InvoiceItems', (req, res) => {
    let query5 = "SELECT * FROM InvoiceItems;"; // Define our query

    db.pool.query(query5, function(error, rows, fields) { // Execute the query

            res.render('InvoiceItems', { data: rows }); // Render the InvoiceItems.hbs file, and also send the renderer
        }) // an object where 'data' is equal to the 'rows'
});

// POST Requests
app.post('/add-cashier-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Cashiers (cashier_first, cashier_last, hourly_rate) VALUES ('${data.cashier_first}', '${data.cashier_last}', '${data.hourly_rate}')`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else
        {
            // If there was no error, perform a SELECT * on Cashiers
            query2 = `SELECT * FROM Cashiers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-customer-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

     // Capture NULL values
     let email = (data.email);
     if (email === '')
     {
         email = 'NULL'
     }

    let street = (data.street);
    if (street === '')
    {
        street = 'NULL'
    }

     let city = (data.city);
     if (city === '')
     {
        city = 'NULL'
     }

    let state = (data.state);
    if (state === '')
    {
        state = 'NULL'
    }

     let zip = parseInt(data.zip);
     if (isNaN(zip))
     {
         zip = 'NULL'
     }

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customer_first, customer_last, email, street, city, state, zip) VALUES ('${data.customer_first}', 
        '${data.customer_last}', ${email}, ${street}, ${city}, ${state}, ${zip})`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else
        {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-plant-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Plants (plant_name, plant_price) VALUES ('${data.plant_name}', '${data.plant_price}')`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else
        {
            // If there was no error, perform a SELECT * on Plants
            query2 = `SELECT * FROM Plants;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-invoice-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Capture NULL values
    let cashier_id = parseInt(data.cashier_id);
    if (isNaN(cashier_id))
    {
        cashier_id = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Invoices (customer_id, cashier_id, total_price, invoice_date) VALUES ('${data.customer_id}', ${cashier_id}, '${data.total_price}', '${data.invoice_date}')`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else
        {
            // If there was no error, perform a SELECT * on Invoices
            query2 = `SELECT * FROM Invoices;`;
            db.pool.query(query2, function(error, rows, fields){

                let invoices = rows;

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    query3 = `SELECT * FROM Customers;`;
                    db.pool.query(query3, function(error, rows, fields){
                        
                        // Save the customers
                        let customers = rows;

                        // Construct an object for reference in the table
                        // Array.map is awesome for doing something with each
                        // element of an array.
                        let customermap = {}
                        customers.map(customer => {
                            let customer_id = parseInt(customer.customer_id, 10);

                            customermap[customer_id] = customer["customer_last"];
                        })

                        invoices = invoices.map(invoice => {
                            return Object.assign(invoice, {invoices: customermap[invoice.invoices]})
                        })

                        res.send(invoices);
                    })
                }
            })
        }
    })
});

app.post('/add-invoiceItem-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO InvoiceItems (invoice_id, plant_id, plant_quantity) VALUES ('${data.invoice_id}', '${data.plant_id}', '${data.plant_quantity}')`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else
        {
            // If there was no error, perform a SELECT * on InvoiceItems
            query2 = `SELECT * FROM InvoiceItems;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-cashier/:cashier_id', function(req, res, next) {
    let data = req.body;
    let deleteCashiers = `DELETE FROM Cashiers WHERE pid = ?`;

    // Run the 1st query
    db.pool.query(deleteCashiers, [req.params.cashier_id], function(error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
    })
});


/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

module.exports = app;