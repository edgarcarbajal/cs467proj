import express from 'express';
import { dbPool } from '../database.js';
import { authMiddleware, signup } from '../authUtilities.js';
import jsonBigInt from '../utilities.js';

const salesRouter = express.Router();





// GET API calls
salesRouter.get('/',authMiddleware('admin'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'select id, name_associate, sale_commission from sales_associate ';
        const rows = await conn.query(query);

        response
            .status(200)
            .json(rows);
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/salesAssociate - Read Unsuccessful',
                error: error.message
            });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});




// PUT API
// Updates the commission in Sales Associate Table
salesRouter.put('/updateCommission', authMiddleware(''), async (request, response) => {
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
            .json({
                message: '/salesAssociate/updatePOTable - Update Successful',
                dbResponses: [
                    jsonBigInt(dbResponse),
                ]
            });
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/salesAssociate/updateComission - Update Unsuccessful',
                error: error.message
            });
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
  
    }
    finally {
        if (conn)
            return conn.end();
    }
});

salesRouter.post('/newSalesAssociate',authMiddleware('admin'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const {username, password} = request.body

        const hashpassword = signup(password)

        const query = 'INSERT INTO sales_associate (name_associate, username, password, sale_commission, address) VALUES (" ", ?, ?, 0, " ")';
        const dbResponse = await conn.query(query, [username,hashpassword]);

        response
            .status(200)
            .json({
                message: '/salesAssociate/newSalesAssociate - Insert Successful',
                dbResponses: [
                    jsonBigInt(dbResponse),
                ]
            });
    }
    catch (error) {
        response
        .status(400)
        .json({
            message: '/salesAssociate/newSalesAssociates - Insert Unsuccessful',
            error: error.message
        });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});








salesRouter.delete('/delete/:saleid',authMiddleware('admin'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'delete from sales_associate Where id = ?';
        const dbResponse = await conn.query(query,[request.params.saleid]);

        response
            .status(200)
            .json({
                message: '/salesassociatesdelete/salesid - Delete Successful',
                dbResponses: [
                    jsonBigInt(dbResponse),
                ]
            });
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/salesassociatesdelete/salesid - Delete Unsuccessful',
                error: error.message
            });

        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});








export default salesRouter;
