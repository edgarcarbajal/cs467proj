// routes ideally separeated by tables/entites of db??
// this is the routes file for Customer table in legacy db

import express from 'express';
import {dbPool} from '../database.js';
const quotesRouter = express.Router();

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
            .send(`Request Error: ${error.message}`);
        
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

        const query = 'select quotes.id `Quote ID`, quotes.cust_id `Customer ID`, sales_associate.id `Associate ID`, username `Sales Associate`, quotes.created_at `Created at` from sales_associate, quotes where quotes.sale_id = sales_associate.id and is_sanctioned = false and is_finalized = false';
        const rows = await conn.query(query);
        

        response
            .status(200)
            .json(rows);
    }
    catch(error) {
        response
            .status(400)
            .send(`Request Error: ${error.message}`);
        
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

        const query = 'select quotes.id `Quote ID`, quotes.cust_id `Customer ID`, sales_associate.id `Associate ID`, username `Sales Associate`, quotes.created_at `Created at` from sales_associate, quotes where quotes.sale_id = sales_associate.id and is_sanctioned = false and is_finalized = true';
        const rows = await conn.query(query);
        

        response
            .status(200)
            .json(rows);
    }
    catch(error) {
        response
            .status(400)
            .send(`Request Error: ${error.message}`);
        
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

        const query = 'select quotes.id `Quote ID`, quotes.cust_id `Customer ID`, sales_associate.id `Associate ID`, username `Sales Associate`, quotes.created_at `Created at` from sales_associate, quotes where quotes.sale_id = sales_associate.id and is_sanctioned = true and is_finalized = true';
        const rows = await conn.query(query);
        

        response
            .status(200)
            .json(rows);
    }
    catch(error) {
        response
            .status(400)
            .send(`Request Error: ${error.message}`);
        
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
            .send(`Request Error: ${error.message}`);
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally{
        if (conn) 
            return conn.end();
    }
});


export default quotesRouter;