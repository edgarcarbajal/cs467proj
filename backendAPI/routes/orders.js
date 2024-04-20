import express from 'express';
import { dbPool } from '../database.js';
import { authMiddleware } from '../authUtilities.js';
import jsonBigInt from '../utilities.js';

const ordersRouter = express.Router();


// POST API Calls (ie: insertion/creation)
ordersRouter.post('/updatePOTable', authMiddleware('hq'), async (request, response) => {
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
        query2 += ' VALUES (?, ?, ?)';
        const db2Response = await conn.query(query2, [
            request.body.quote_id,
            request.body.staff_id,
            request.body.order_id
        ]);

        response
            .status(200)
            .json({
                message: '/orders/updatePOTable - Insertion Successful',
                dbResponses: [
                    jsonBigInt(dbResponse),
                    jsonBigInt(db2Response),
                ]
            });
    }
    catch (error) {
        response
            .status(400)
            .json({
                message: '/orders/updatePOTable - Insertion Unsuccessful',
                error: error.message
            });
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally {
        if (conn)
            return conn.end();
    }
});

export default ordersRouter;