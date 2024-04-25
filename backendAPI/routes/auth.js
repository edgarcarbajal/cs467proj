import express from 'express';
import {dbPool} from '../database.js';
import { authMiddleware, generateJWT, login } from '../authUtilities.js';

const authRouter = express.Router();

// testing authMiddleware! - Makes sure User Auth token is present!
authRouter.get('/', authMiddleware('admin'), async (request, response) => {
    console.log(request.user);

    response
        .status(200)
        .json({message: 'Access Granted! Welcome to /auth endpoint! Nothing Here!'});
});

authRouter.post('/salesassociate/login', async (request, response) => {
    let conn;
    try {
        const {username, password} = request.body;
        conn = await dbPool.getConnection();

        const query = 'select * from sales_associate where username = ?';
        const rows = await conn.query(query, [username]);

        if(rows?.length > 0 && login(username, password, rows[0])) {
            const token = generateJWT({
                id: rows[0].id,
                username,
                userType: 'sales',
                name: rows[0].name_associate
            });
            response
                .status(200)
                .json(token);
        }
        else {
            response
                .status(401)
                .json({
                    message: '/auth/salesassociate/login - Login Unsuccessful',
                    error: 'Unsuccessful Login Error: Invalid Username or password'
                });
        }
    }
    catch(error) {
        response
            .status(400)
            .json({
                message: '/auth/salesassociate/login - Login Request Unsuccessful',
                error: error.message
            });
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally{
        if (conn) 
            return conn.end();
    }
});

authRouter.post('/administrator/login', async (request, response) => {
    let conn;
    try {
        const {username, password} = request.body;
        conn = await dbPool.getConnection();

        const query = 'select * from hq_staff where username = ? and is_admin = true';
        const rows = await conn.query(query, [username]);

        if(rows?.length > 0 && login(username, password, rows[0])) {
            const token = generateJWT({
                id: rows[0].id,
                username,
                userType: 'admin',
            });
         
            response
                .status(200)
                .json(token);
        }
        else {
            response
                .status(401)
                .json({
                    message: '/auth/administrator/login - Login Unsuccessful',
                    error: 'Unsuccessful Login Error: Invalid Username or password'
                });
        }
    }
    catch(error) {
        response
            .status(400)
            .json({
                message: '/auth/administrator/login - Login Request Unsuccessful',
                error: error.message
            });
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally{
        if (conn) 
            return conn.end();
    }
});

authRouter.post('/headquarters/login', async (request, response) => {
    let conn;
    try {
        const {username, password} = request.body;
        conn = await dbPool.getConnection();

        const query = 'select * from hq_staff where username = ? and is_admin = false';
        const rows = await conn.query(query, [username]);

        if(rows?.length > 0 && login(username, password, rows[0])) {
            const token = generateJWT({
                id: rows[0].id,
                username,
                userType: 'hq'
            });
            
            response
                .status(200)
                .json(token);
        }
        else {
            response
                .status(401)
                .json({
                    message: '/auth/headquarters/login - Login Unsuccessful',
                    error: 'Unsuccessful Login Error: Invalid Username or password'
                });
                
        }
    }
    catch(error) {
        response
            .status(400)
            .json({
                message: '/auth/headquarters/login - Login Request Unsuccessful',
                error: error.message
            });
        
        console.log('!!! Error while connecting to database!\n*** Error Message:\n', error);
    }
    finally{
        if (conn) 
            return conn.end();
    }
});


export default authRouter;