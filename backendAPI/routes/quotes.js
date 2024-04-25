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
            .json({
                message: '/quotes - Read Unsuccessful',
                error: error.message
            });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});

quotesRouter.get('/open', authMiddleware('sales'), async (request, response) => {
    let conn;
    let legacyConn;
    try {
        conn = await dbPool.getConnection();
        legacyConn = await legacydbPool.getConnection();

        const legacyQuery = 'select id, name from customers';
        const custNames = await legacyConn.query(legacyQuery);

        const custNamesMap = new Map();
        custNames.forEach(customer => custNamesMap.set(customer.id, customer.name));

        const query = 'select quotes.id `Quote ID`, quotes.cust_id `Customer ID`, sales_associate.id `Associate ID`, name_associate `Sales Associate`, quotes.created_at `Created at`, quotes.last_modified `Last Modified at`, quotes.price `Price ($)` from sales_associate, quotes where quotes.sale_id = sales_associate.id and is_sanctioned = false and is_finalized = false';
        let rows = await conn.query(query);

        //add customer names into query results
        rows = rows.map(quote => {
            return {
                ...quote,
                'Customer': custNamesMap.get(quote['Customer ID'])
            };
        })


        response
            .status(200)
            .json(rows);
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/quotes/in-review - Read Unsuccessful',
                error: error.message
            });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});


quotesRouter.get('/finalized', authMiddleware('hq'), async (request, response) => {
    let conn;
    let legacyConn;
    try {
        conn = await dbPool.getConnection();
        legacyConn = await legacydbPool.getConnection();

        const legacyQuery = 'select id, name from customers';
        const custNames = await legacyConn.query(legacyQuery);

        const custNamesMap = new Map();
        custNames.forEach(customer => custNamesMap.set(customer.id, customer.name));

        const query = 'select quotes.id `Quote ID`, quotes.cust_id `Customer ID`, sales_associate.id `Associate ID`, name_associate `Sales Associate`, quotes.created_at `Created at`, quotes.last_modified `Last Modified at`, quotes.price `Price ($)` from sales_associate, quotes where quotes.sale_id = sales_associate.id and is_sanctioned = false and is_finalized = true';
        let rows = await conn.query(query);


        //add customer names into query results
        rows = rows.map(quote => {
            return {
                ...quote,
                'Customer': custNamesMap.get(quote['Customer ID'])
            };
        })


        response
            .status(200)
            .json(rows);
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/quotes/finalized - Read Unsuccessful',
                error: error.message
            });

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
        query += ' quotes.created_at `Created at`, name_associate `Sales Associate`, last_modified `Last Modified at`,';
        query += ' quotes.price `Price ($)` from quotes, sales_associate where quotes.id not in (select quote_id `Quote ID` from converts)';
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
            .json({
                message: '/quotes/sanctioned - Read Unsuccessful',
                error: error.message
            });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
        if (legacyConn)
            return legacyConn.end();
    }
});

//actually a GET, but using PUT so we can send a body in the request
quotesRouter.put('/adminQuotes', authMiddleware('admin'), async (request, response) => {
    let conn;
    let conn1;
    try {
        conn = await dbPool.getConnection();
        conn1 = await legacydbPool.getConnection();
        
        const custquery = 'select id, name from customers order by id asc';
        const custname = await conn1.query(custquery);

        const custnameMap = new Map();
        custname.forEach(customer => custnameMap.set(customer.id, customer.name));

        const orderquery = 'select quote_id from converts';
        const orderid =  await conn.query(orderquery);

        const orderset = new Set()
        orderid.forEach(order => {
            orderset.add(order.quote_id);
        });

        const {startDate, endDate, status, associate, customer} = request.body;

        const q1 = 'select quotes.id, quotes.cust_id, quotes.sale_id, quotes.created_at `Created At`, sales_associate.name_associate `Sales Associate`, quotes.price `Price ($)`, quotes.is_finalized, quotes.is_sanctioned from quotes, sales_associate where quotes.sale_id = sales_associate.id ';
        const q2 = 'and quotes.created_at between ? and ? ';
        const q3 = 'and quotes.sale_id = ? ';
        const q4 = 'and quotes.cust_id = ? ';
        const q5 = 'and quotes.is_finalized = ? and quotes.is_sanctioned = ? ';
        const q6 = 'and quotes.id in (select quote_id from converts) ';
        const q6v2 = 'and quotes.id not in (select quote_id from converts) ';
        const q7 = 'order by quotes.id asc;';


        let query = q1 + q2;
        let queryArgs = [startDate, endDate];
        let [isFinalized, isSanctioned] = [false, false];

    
        if (status === 'open') {
            query += q5;

            queryArgs.push(isFinalized);
            queryArgs.push(isSanctioned);
        }
        else if (status === 'finalized') {
            isFinalized = true;
            query += q5;

            queryArgs.push(isFinalized);
            queryArgs.push(isSanctioned);
        }
        else if (status === 'sanctioned') {
            isFinalized = true;
            isSanctioned = true;
            query += q5 + q6v2;

            queryArgs.push(isFinalized);
            queryArgs.push(isSanctioned);
        }
        else if (status === 'ordered') {
            query += q6;
        }

        if(associate != 'all') {
            query += q3;
            queryArgs.push(associate);
        }
        if(customer != 'all') {
            query += q4;
            queryArgs.push(customer);
        }


        query += q7;
        //console.log(query)
        //console.log(queryArgs)
        let rows = await conn.query(query, queryArgs);

        rows = rows.map(item => {
            let Status = '';
            if (orderset.has(item.id)){
                Status = 'Ordered';
            }
            else if (!item.is_finalized && !item.is_sanctioned) {
                Status = 'Open';
            }
            else if (item.is_finalized && item.is_sanctioned) {
                Status = 'Sanctioned';
            }
            else if (item.is_finalized && !item.is_sanctioned) {
                Status = 'Finalized';
            }
           
           delete item.is_finalized;
           delete item.is_sanctioned;

           return {
                ...item, 
                "Customer Name": custnameMap.get(item.cust_id),
                Status,
            }
        })

        response
            .status(200)
            .json(rows);
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/quotes/adminQuotes - Read Unsuccessful',
                error: error.message
            });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
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
            .json({
                message: '/quotes/info - Read Unsuccessful',
                error: error.message
            });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});



// POST API calls
quotesRouter.post('/createQuote', authMiddleware('sales'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const {cust_id, sale_id, is_finalized, is_sanctioned, line_items, secretnotes, discounts, price, cust_email} = request.body

        const query = 'insert into quotes(cust_id, sale_id, is_finalized, is_sanctioned, line_items, secretnotes, discounts, price, cust_email) values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const dbResponse = await conn.query(query, [cust_id, sale_id, is_finalized, is_sanctioned, line_items, secretnotes, discounts, price, cust_email]);

        response
            .status(200)
            .json({
                message: '/quotes/createQuote - Update Successful',
                dbResponses: [
                    jsonBigInt(dbResponse),
                ]
            });
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/quotes/createQuote - Update Unsuccessful',
                error: error.message
            });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
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

        response
            .status(200)
            .json({
                message: '/quotes/updateInfo - Update Successful',
                dbResponses: [
                    jsonBigInt(dbResponse),
                ]
            });
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/quotes/updateInfo - Update Unsuccessful',
                error: error.message
            });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});

export default quotesRouter;