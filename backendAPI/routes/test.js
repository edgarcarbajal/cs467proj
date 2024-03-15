// routes ideally separeated by tables/entites of db??
// this is the routes file for test table

import express from 'express';
import dbPool from '../database.js';
const testRouter  = express.Router();


/* Template body of any API call that needs to make a connection+query to db:

*******************
    let conn;
    try {
        //create connection thread
        conn = await dbPool.getConnection();

        // do queries here

        ...

        // Send response here...
    }
    catch(error) {
        // send error respose to user

        ...

        // throw/handle error to server
        throw error;
    }
    finally{
        // Terminate connection thread once done
        if (conn) 
            return conn.end();
    }
********************
*/

testRouter.get('/', async (request, response) => {
    let conn;
    try {
        //create connection thread
        conn = await dbPool.getConnection();

        // do queries here
        const query = 'select * from test';
        const rows = await conn.query(query);

        // Send response here...
        response
            .status(200)
            .json(rows);
    }
    catch(error) {
        // send error respose to user
        response
            .status(400)
            .send(`Request Error: ${error.message}`);

        // throw/handle error to server
        console.log(error);
        throw error;
    }
    finally{
        // Terminate connection thread once done
        if (conn) 
            return conn.end();
    }
});

testRouter.get('/:name/:id', async (request, response) => {
    let conn;
    try {
        //create connection thread
        conn = await dbPool.getConnection();

        // do queries here
        const query = 'select * from test where id = ? and name = ?';
        const rows = await conn.query(query, [request.params.id, request.params.name]);

        // Send response here...
        response
            .status(200)
            .json(rows);
    }
    catch(error) {
        // throw/handle error to server
        response
            .status(400)
            .send(`Request Error: ${error.message}`);

        console.log(error);
        throw error;
    }
    finally{
        // Terminate connection thread once done
        if (conn) 
            return conn.end();
    }
});

export default testRouter;
