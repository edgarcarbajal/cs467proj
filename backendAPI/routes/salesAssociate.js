import express from 'express';
import { dbPool } from '../database.js';
import { authMiddleware } from '../authUtilities.js';
import jsonBigInt from '../utilities.js';

const salesRouter = express.Router();


// PUT API
// Updates the commission in Sales Associate Table
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


export default salesRouter;
