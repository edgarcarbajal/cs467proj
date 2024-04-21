import express from 'express';
import { dbPool } from '../database.js';
import { authMiddleware, signup } from '../authUtilities.js';
import jsonBigInt from '../utilities.js';

const salesRouter = express.Router();





// GET API calls
salesRouter.get('/', authMiddleware('admin'), async (request, response) => {
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


salesRouter.get('/info/:saleID', authMiddleware('admin'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const query = 'select id, name_associate, username, address, sale_commission from sales_associate where id = ?';
        const rows = await conn.query(query, [request.params.saleID]);

        response
            .status(200)
            .json(rows);
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/salesAssociate//info/:saleID - Read Unsuccessful',
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
salesRouter.put('/updateInfo', authMiddleware('admin'), async (request, response) => {
    let conn;
    try {
        conn = await dbPool.getConnection();

        const {id, name_associate, username, password, address, sale_commission} = request.body;
        let query;
        let dbResponse;
        if (password?.length > 0) {
            query = 'update sales_associate set name_associate = ?, username = ?, password = ?, address = ?, sale_commission = ? where id = ?';
            const hashedPassword = signup(password);
            dbResponse = await conn.query(query, [name_associate, username, hashedPassword, address, sale_commission, id]);
        }
        else {
            query = 'update sales_associate set name_associate = ?, username = ?, address = ?, sale_commission = ? where id = ?';
            dbResponse = await conn.query(query, [name_associate, username, address, sale_commission, id]);
        }


        response
            .status(200)
            .json({
                message: '/salesAssociate/updateInfo - Update Successful',
                dbResponses: [
                    jsonBigInt(dbResponse),
                ]
            });
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/salesAssociate/updateInfo - Update Unsuccessful',
                error: error.message
            });
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
  
    }
    finally {
        if (conn)
            return conn.end();
    }
});



salesRouter.put('/updateCommission', authMiddleware('hq'), async (request, response) => {
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

        const query = 'INSERT INTO sales_associate (name_associate, username, password, sale_commission, address) VALUES ("{name not set}", ?, ?, 0, " ")';
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
