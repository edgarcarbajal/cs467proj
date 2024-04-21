import express from 'express';
import { dbPool } from '../database.js';
import { authMiddleware } from '../authUtilities.js';
import jsonBigInt from '../utilities.js';

const adminRouter = express.Router();

// PUT API
// Updates the address in Associate Table
adminRouter.put('/updateAddress', authMiddleware('admin'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'UPDATE sales_associate SET sale_address = ? WHERE id = ?';
        const dbResponse = await conn.query(query, [
            request.body.address,
            request.body.salesID
        ]);

        response
            .status(200)
            .json({
                message: '/salesAssociate/updateAssociateTable - Update Successful',
                dbResponses: [
                    jsonBigInt(dbResponse),
                ]
            });
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/salesAssociate/updateAdress - Update Unsuccessful',
                error: error.message
            });
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
  
    }
    finally {
        if (conn)
            return conn.end();
    }
});

//update associate password
adminRouter.put('/updatePassword', authMiddleware('admin'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'UPDATE sales_associate SET sale_password = ? WHERE id = ?';
        const dbResponse = await conn.query(query, [
            request.body.password,
            request.body.salesID
        ]);

        response
            .status(200)
            .json({
                message: '/salesAssociate/updateAssociateTable - Update Successful',
                dbResponses: [
                    jsonBigInt(dbResponse),
                ]
            });
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/salesAssociate/updatePassword - Update Unsuccessful',
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
// Updates the commission in Associate Table
adminRouter.put('/updateCommission', authMiddleware('admin'), async (request, response) => {
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
//add a sales associate
adminRouter.put('/addSalesAssociates', authMiddleware('admin'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'INSERT INTO sales_associate (id, sales_name) VALUES (?,?) ';
        const dbResponse = await conn.query(query, [
            request.body.salesname,
            request.body.salesID
        ]);

        response
            .status(200)
            .json({
                message: '/salesAssociate/updateAssociateTable - Update Successful',
                dbResponses: [
                    jsonBigInt(dbResponse),
                ]
            });
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/salesAssociate/updateAssociateName - Update Unsuccessful',
                error: error.message
            });
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
  
    }
    finally {
        if (conn)
            return conn.end();
    }
});

export default adminRouter;
