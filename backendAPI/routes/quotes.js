// routes ideally separeated by tables/entites of db??
// this is the routes file for Customer table in legacy db

import express from 'express';
import {dbPool} from '../database.js';
import jsonBigInt from '../utilities.js';
const quotesRouter = express.Router();



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
    catch(error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}`});
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally{
        if (conn) 
            return conn.end();
    }
});

quotesRouter.get('/in-review', async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'select quotes.id `Quote ID`, quotes.cust_id `Customer ID`, sales_associate.id `Associate ID`, username `Sales Associate`, quotes.created_at `Created at`, quotes.last_modified `Last Modified at` from sales_associate, quotes where quotes.sale_id = sales_associate.id and is_sanctioned = false and is_finalized = false';
        const rows = await conn.query(query);
        

        response
            .status(200)
            .json(rows);
    }
    catch(error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}`});
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally{
        if (conn) 
            return conn.end();
    }
});


quotesRouter.get('/finalized', async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'select quotes.id `Quote ID`, quotes.cust_id `Customer ID`, sales_associate.id `Associate ID`, username `Sales Associate`, quotes.created_at `Created at`, quotes.last_modified `Last Modified at` from sales_associate, quotes where quotes.sale_id = sales_associate.id and is_sanctioned = false and is_finalized = true';
        const rows = await conn.query(query);
        

        response
            .status(200)
            .json(rows);
    }
    catch(error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}`});
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally{
        if (conn) 
            return conn.end();
    }
});


quotesRouter.get('/sanctioned', async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'select quotes.id `Quote ID`, quotes.cust_id `Customer ID`, sales_associate.id `Associate ID`, username `Sales Associate`, quotes.created_at `Created at`, quotes.last_modified `Last Modified at` from sales_associate, quotes where quotes.sale_id = sales_associate.id and is_sanctioned = true and is_finalized = true';
        const rows = await conn.query(query);
        

        response
            .status(200)
            .json(rows);
    }
    catch(error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}`});
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally{
        if (conn) 
            return conn.end();
    }
});


quotesRouter.get('/info/:quoteID/:custID/:salesID', async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'select * from quotes where id = ? and cust_id = ? and sale_id = ?';
        const rows = await conn.query(query, [request.params.quoteID, request.params.custID, request.params.salesID]);
        

        response
            .status(200)
            .json(rows);
    }
    catch(error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}`});
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally{
        if (conn) 
            return conn.end();
    }
});


// POST API Calls

// PUT API Calls
quotesRouter.put('/updateInfo/:quoteID/:custID/:salesID', async (request, response) => {
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
    catch(error) {
        response
            .status(400)
            .send({ message: `Request Error: ${error.message}`});
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally{
        if (conn) 
            return conn.end();
    }
});

// DELETE API Calls


export default quotesRouter;