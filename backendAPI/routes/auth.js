import express from 'express';
import {dbPool} from '../database.js';
import { authMiddleware, generateJWT, login } from '../authUtilities.js';

const authRouter = express.Router();

// testing authMiddleware! - Makes sure User Auth token is present!
authRouter.get('/', authMiddleware, async (request, response) => {
    response
        .status(200)
        .json({message: 'Access Granted! Welcome to /auth endpoint! Nothing Here!'});
});

authRouter.post('/login', async (request, response) => {
    let conn;
    try {
        const {username, password} = request.body;
        conn = await dbPool.getConnection();

        const query = 'select * from hq_staff where username = ?';
        const rows = await conn.query(query, [username]);

        if(rows?.length > 0 && login(username, password, rows[0])) {
            const token = generateJWT({username}, process.env.JWT_SECRET);
            response
                .status(200)
                .json(token);
        }
        else {
            response
                .status(401)
                .send({message: 'Unsuccessful Login Error: Invalid Username or password'});
        }
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


export default authRouter;