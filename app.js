/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
PORT = 9157;

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({
    defaultLayout: 'main',
    extname: ".hbs"
})); // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

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
    let query4 = "SELECT * FROM Invoices;"; // Define our query

    db.pool.query(query4, function(error, rows, fields) { // Execute the query

            res.render('Invoices', { data: rows }); // Render the Invoices.hbs file, and also send the renderer
        }) // an object where 'data' is equal to the 'rows'
});

app.get('/InvoiceItems', (req, res) => {
    let query5 = "SELECT * FROM InvoiceItems;"; // Define our query

    db.pool.query(query5, function(error, rows, fields) { // Execute the query

            res.render('InvoiceItems', { data: rows }); // Render the InvoiceItems.hbs file, and also send the renderer
        }) // an object where 'data' is equal to the 'rows'
});

// POST Requests

app.post('/add-cashier-form', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Cashiers (cashier_first, cashier_last, hourly_rate) VALUES ('${data['input-cashier_first']}', '${data['input-cashier_last']}', '${data['input-hourly_rate']}')`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('/Cashiers');
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