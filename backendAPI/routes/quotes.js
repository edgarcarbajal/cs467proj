// routes ideally separeated by tables/entites of db??
// this is the routes file for Customer table in legacy db

import express from 'express';
import { dbPool, legacydbPool } from '../database.js';
import jsonBigInt from '../utilities.js';
import { authMiddleware } from '../authUtilities.js';
const quotesRouter = express.Router();

//quotesRouter.use(authMiddleware);

// GET API calls
quotesRouter.get('/', async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'select * from quotes';
        const rows = await conn.query(query);

        response
            .status(200)
            .json(rows);
    }
    catch (error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}` });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});

quotesRouter.get('/in-review', authMiddleware('sales'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'select quotes.id `Quote ID`, quotes.cust_id `Customer ID`, sales_associate.id `Associate ID`, username `Sales Associate`, quotes.created_at `Created at`, quotes.last_modified `Last Modified at` from sales_associate, quotes where quotes.sale_id = sales_associate.id and is_sanctioned = false and is_finalized = false';
        const rows = await conn.query(query);


        response
            .status(200)
            .json(rows);
    }
    catch (error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}` });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});


quotesRouter.get('/finalized', authMiddleware('hq'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'select quotes.id `Quote ID`, quotes.cust_id `Customer ID`, sales_associate.id `Associate ID`, username `Sales Associate`, quotes.created_at `Created at`, quotes.last_modified `Last Modified at` from sales_associate, quotes where quotes.sale_id = sales_associate.id and is_sanctioned = false and is_finalized = true';
        const rows = await conn.query(query);


        response
            .status(200)
            .json(rows);
    }
    catch (error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}` });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});

quotesRouter.get('/sanctioned', authMiddleware('hq'), async (request, response) => {
    let conn;
    try {
        // Connecting to Databases
        conn = await dbPool.getConnection();
        let legacyConn = await legacydbPool.getConnection();

        // Legacy Query to get all the Customer IDs and their Names
        const legacyQuery = 'select id `Customer ID`, name `Customer Name` from customers';
        const legacyResult = await legacyConn.query(legacyQuery);

        // Query from the project DB
        // quoteID, salesID, custID
        // SELECT id FROM quotes WHERE id NOT IN (select quote_id FROM converts);
        var query = 'select quotes.id `Quote ID`, cust_id `Customer ID`, sale_id `Salesperson ID`,';
        query += ' quotes.created_at `Created at`, username `Sales Associate`, last_modified `Last Modified at`,';
        query += ' quotes.price `Price` from quotes, sales_associate where quotes.id not in (select quote_id `Quote ID` from converts)';
        query += ' and sale_id = sales_associate.id and is_sanctioned = true and is_finalized = true';
        const newDBResult = await conn.query(query);

        // Create a map to store the customer names by cust_id
        const mapCustomerName = new Map();

        // Iterate over legacyResult to populate the map
        for (const row of legacyResult) {
            const custId = row['Customer ID'];
            const customerName = row['Customer Name'];
            mapCustomerName.set(custId, customerName);
        }

        // Mapping "Customer Name" from legacyResult to projDB results based on cust_id
        for (const row of newDBResult) {
            const custId = row['Customer ID'];

            // Check if customer id exists in the map
            if (mapCustomerName.has(custId)) {
                // Assign the customer name to the row
                row['Customer Name'] = mapCustomerName.get(custId);
            } else {
                // cust_id doesn't exist in legacyResult
                row['Customer Name'] = null; // or any default value
            }
        }

        // Old Query from Edgar
        // const query = 'select quotes.id `Quote ID`, quotes.cust_id `Customer ID`, sales_associate.id `Associate ID`, username `Sales Associate`, quotes.created_at `Created at`, quotes.last_modified `Last Modified at` from sales_associate, quotes where quotes.sale_id = sales_associate.id and is_sanctioned = true and is_finalized = true';

        response
            .status(200)
            .json(newDBResult);
    }
    catch (error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}` });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
        if (legacyConn)
            return legacyConn.end();
    }
});


quotesRouter.get('/info/:quoteID/:custID/:salesID', authMiddleware(''), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'select * from quotes where id = ? and cust_id = ? and sale_id = ?';
        const rows = await conn.query(query, [request.params.quoteID, request.params.custID, request.params.salesID]);

        response
            .status(200)
            .json(rows);
    }
    catch (error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}` });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});


// POST API Calls
// Insert API Call
quotesRouter.post('/updatePOTable/', authMiddleware('hq'), async (request, response) => {
    let conn;

    try {
        conn = await dbPool.getConnection();
        let query = 'INSERT INTO purchase_order (id, created_at, process_date, sale_commission)';
        query += ' VALUES (?, ?, ?, ?)';
        
        let commission = request.body.sale_commission;
        commission = parseFloat(commission.replace('%', ''));

        const dbResponse = await conn.query(query, [
            request.body.order_id,
            request.body.created_at,
            request.body.process_date,
            commission
        ]);

        let query2 = 'INSERT INTO converts (quote_id, staff_id, order_id)';
        query2 += ' VALUES (?, 1, ?)';
        const db2Response = await conn.query(query2, [
            request.body.quote_id,
            // request.body.staff_id,
            request.body.order_id
        ]);

        response
            .status(200)
            .json(jsonBigInt(dbResponse + " " + db2Response));
    }
    catch (error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}` });
    }
    finally {
        if (conn)
            return conn.end();
    }
});

// PUT API
// Updates the commission in Sales Associate Table
quotesRouter.put('/updateCommission/', authMiddleware('hq'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'UPDATE sales_associate SET sale_commission = sale_commission + ? WHERE id = ?';
        const dbResponse = await conn.query(query, [
            request.body.commission,
            request.body.salesID
        ]);

        response
            .status(200)
            .send(jsonBigInt(dbResponse));
    }
    catch (error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}` });
    }
    finally {
        if (conn)
            return conn.end();
    }
});


// PUT API Calls
quotesRouter.put('/updateInfo/:quoteID/:custID/:salesID', authMiddleware(''), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        //console.log(request.body);
        //console.log(request.body.line_items);

        const query = 'UPDATE quotes SET is_finalized = ?, is_sanctioned = ?, line_items = ?, secretnotes = ?, discounts = ?, price = ?, cust_email = ? WHERE id = ? and cust_id = ? and sale_id = ?';
        const dbResponse = await conn.query(query, [
            request.body.is_finalized,
            request.body.is_sanctioned,
            request.body.line_items,
            request.body.secretnotes,
            request.body.discounts,
            request.body.price,
            request.body.cust_email,
            request.params.quoteID,
            request.params.custID,
            request.params.salesID
        ]);

        console.log(dbResponse);

        response
            .status(200)
            .send(jsonBigInt(dbResponse));
    }
    catch (error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}` });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});

export default quotesRouter;