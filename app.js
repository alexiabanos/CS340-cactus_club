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
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({
    defaultLayout: 'main',
    extname: ".hbs"
    }));                                        // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


app.get('/', (req, res) =>{
    res.render('index')
});

app.get('/Cashiers', (req, res) =>{ 
        let query1 = "SELECT * FROM Cashiers;";                  // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('Cashiers', {data: rows});               // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows'
    });

app.get('/Customers', (req, res) =>{ 
        let query1 = "SELECT * FROM Customers;";                // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('Customers', {data: rows});              // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows'
    });

app.get('/Plants', (req, res) =>{ 
        let query3 = "SELECT * FROM Plants;";                   // Define our query

        db.pool.query(query3, function(error, rows, fields){    // Execute the query

            res.render('Plants', {data: rows});                 // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows'
    });

app.get('/Invoices', (req, res) =>{  
        let query4 = "SELECT * FROM Invoices;";                  // Define our query

        db.pool.query(query4, function(error, rows, fields){    // Execute the query

            res.render('Invoices', {data: rows});               // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows'
    });

app.get('/InvoiceItems', (req, res) =>{
        let query5 = "SELECT * FROM InvoiceItems;";             // Define our query

        db.pool.query(query5, function(error, rows, fields){    // Execute the query

            res.render('InvoiceItems', {data: rows});           // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows'
    });
    

/*
    LISTENER
*/
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

module.exports = app;