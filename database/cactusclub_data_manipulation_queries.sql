-- These are the Database Manipulation queries for the Cactus Club Project Website 

-- get all Plant attributes to populate the Plant table page
SELECT plant_id, plant_name, plant_prince FROM Plants

-- get all Customer attributes to populate the Customer table page
SELECT customer_id, address_id, customer_last, customer_first, email FROM Customers

-- add a new Customer
INSERT INTO Customers (customer_first, customer_last, street, email, city, state, zip) VALUES (:fnameInput, :lnameInput, :streetInput, :emailInput, :cityInput, : stateInput, :zipInput)

-- associate a Plant with an Inovice (M-to-M relationship addition)
INSERT INTO InvoiceItems (invoice_id, plant_id, plant_quantity) VALUES (:invoice_id_from_dropdown_Input, :plant_id_from_dropdown_Input, :plant_quantity_from_dropdown_Input)

-- update a Customer's data based on submission of the Update Customer form 
UPDATE Customers SET customer_first = :fnameInput, customer_last= :lnameInput, street = :streetInput, email = :emailInput, city = :cityInput, state = :stateInput, zip = :zipInput WHERE customer_id= :customer_ID_from_update_form

-- delete a Customer
DELETE FROM Customers WHERE customer_id = :customer_ID_selected_from_customer_table

-- dis-associate a certificate from a person (M-to-M relationship deletion)
DELETE FROM bsg_cert_people WHERE pid = :character_ID_selected_from_certificate_and_character_list AND cid = :certification_ID_selected_from-certificate_and_character_list

-- dis-associate a Plant from an Inovice (M-to-M relationship deletion)
DELETE FROM InvoiceItems WHERE invoice_id = :invoice_id_from_dropdown_Input AND plant_id = :plant_id_from_dropdown_Input

---- (OR?) dis-associate a Plant from an Inovice (M-to-M relationship deletion)
--DELETE FROM InvoiceItems WHERE invoiceItem_id = :invoiceItem_id_from_dropdown_Input