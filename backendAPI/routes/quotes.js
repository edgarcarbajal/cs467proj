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


quotesRouter.get('/sanctioned', async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'select * from quotes where is_sanctioned = true';
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


export default quotesRouter;