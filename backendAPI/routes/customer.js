// routes ideally separeated by tables/entites of db??
// this is the routes file for Customer table in legacy db

import express from 'express';
import {legacydbPool} from '../database.js';
const customerRouter = express.Router();

customerRouter.get('/', async (request, response) => {
    let conn;
    try {
        conn = await legacydbPool.getConnection();

        const query = 'select * from customers';
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

customerRouter.get('/:custID', async (request, response) => {
    let conn;
    try {
        conn = await legacydbPool.getConnection();

        const query = 'select * from customers where id = ?';
        const rows = await conn.query(query, [request.params.custID]);
        

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

export default customerRouter;