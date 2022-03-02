-- Database Manipulation Queries for the Cactus Club Project Website
-- CS 340 Project: Team 17 - Nathan Klump & Lidia Alexia Banos
-- colon : character being used to denote the variables that will have data from the backend programming language.
--

--
-- Database: cactus_club_manipulation_queries.sql
--

-- --------------------------------------------------------

--
-- get all Plant attributes to populate the Plant table page
--
SELECT plant_id, plant_name, plant_price FROM Plants

--
-- get all Customer attributes to populate the Customer table page
--
SELECT customer_id, address_id, customer_last, customer_first, email FROM Customers

--
-- get all Cashier attributes to populate the Cashiers table page
--
SELECT cashier_id, cashier_first, cashier_last, hourly_rate FROM Cashiers

--
-- get all InvoiceItem attributes to populate the InvoiceItems table page
--
SELECT invoiceItem_id, invoice_id, plant_id, plant_quantity FROM InvoiceItems

--
-- get all Invoice attributes to populate the Invoices table page
--
SELECT invoice_id, customer_id, cashier_id, total_price, invoice_date FROM Invoices

-- --------------------------------------------------------

--
-- add a new Customer
--
INSERT INTO Customers (customer_first, customer_last, street, email, city, customer_state, zip) 
VALUES (:fnameInput, :lnameInput, :streetInput, :emailInput, :cityInput, :stateInput, :zipInput)

--
-- add a new Cashier
--
INSERT INTO Cashiers (cashier_id, cashier_first, cashier_last, hourly_rate) 
VALUES (:fnameInput, :lnameInput, :hourlyrateInput)

--
-- add a new Plant
--
INSERT INTO Plants (plant_id, plant_name, plant_price) 
VALUES (:pnameInput, :lnameInput, :priceInput)

--
-- add a new Invoice
--
INSERT INTO Invoices (invoice_id, customer_id, cashier_id, total_price, invoice_date) 
VALUES (:customer_id_from_dropdown_Input, :cashier_id_from_dropdown_Input, :totalpriceInput, :dateInput)

--
-- associate a Plant with an Inovice (M-to-M relationship addition)
--
INSERT INTO InvoiceItems (invoice_id, plant_id, plant_quantity) 
VALUES (:invoice_id_from_dropdown_Input, :plant_id_from_dropdown_Input, :quantityInput)

-- --------------------------------------------------------

--
-- update a Customer's data based on submission of the Update Customer form 
--
UPDATE Customers 
SET customer_first = :fnameInput, customer_last= :lnameInput, street = :streetInput, email = :emailInput, city = :cityInput, customer_state = :stateInput, zip = :zipInput 
WHERE customer_id = :customer_ID_from_update_form

--
-- update a Plant's data based on submission of the Update Plant form
--
UPDATE Plants 
SET plant_name = :pnameInput, plant_price = :priceInput
WHERE plant_id = :plant_ID_from_update_form

--
-- update a Invoice's data based on submission of the Update Invoices form 
--
UPDATE Invoices 
SET ustomer_id = :customer_id_from_dropdown_Input:, cashier_id = :cashier_id_from_dropdown_Input, total_price = :priceInput, invoice_date = :dateInput 
WHERE invoices_id = :invoices_ID_from_update_form

--
-- update a Cashiers's data based on submission of the Update Cashier form 
--
UPDATE Cashiers 
SET cashier_first = :fnameInput, cashier_last= :lnameInput, hourly_rate= :hourlyrateInput  
WHERE cashier_id= :cashier_ID_from_update_form

--
-- update an Invoice Item's data based on submission of the Update InvoiceItem form 
--
UPDATE InvoiceItems 
SET invoice_id = :invoice_id_from_dropdown_Input, plant_id= :plant_id_from_dropdown_Input, plant_quantity: quantityInput
WHERE invoiceItem_id = :invoiceItem_ID_from_update_form

-- --------------------------------------------------------

--
-- delete a Customer
--
DELETE FROM Customers 
WHERE customer_id = :customer_ID_selected_from_customer_table

--
-- delete a Plant
--
DELETE FROM Plants
WHERE plant_id = :plant_ID_from_update_form

--
-- delete an Invoice
--
DELETE FROM Invoices
WHERE invoices_id = :invoices_ID_from_update_form

--
-- delete a Cashier
--
DELETE FROM Cashiers
WHERE cashier_id= :cashier_ID_from_update_form

--
-- delete an Invoice Item
--
DELETE FROM InvoiceItems
WHERE invoiceItem_id = :invoiceItem_ID_from_update_form

--
-- dis-associate a Plant from an Inovice (M-to-M relationship deletion)
--
DELETE FROM InvoiceItems 
WHERE invoice_id = :invoice_id_from_dropdown_Input AND plant_id = :plant_id_from_dropdown_Input