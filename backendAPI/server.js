// Using "type": "module" in package.json in order to use ES Modules import statements
import express from 'express';
import morgan from 'morgan';

// Load all environment vars into process.env (must make your own!!! See template to see what to create)
import 'dotenv/config';

// load routers now that we have the env vars loaded:
import testRouter from './routes/test.js';
import customerRouter from './routes/customer.js';
import quotesRouter from './routes/quotes.js';

// init express
const server = express();
const port = process.env.SERVER_PORT ||  8000;

//middleware calls (adding useful functionallity to express)
server.use(express.json());
server.use(morgan('dev')); // <-- middleware for logging when requests are made to this backendAPI server


// API Routes (most should come from their own file in 'routes/' dir)
server.get('/', (request, response) => {
    response
        .status(200)
        .send('Hello world! first API!!');
});

// import routes from other files! (can prepend a routename before the routes defined in different files!)
server.use('/test', testRouter);
server.use('/customer', customerRouter);
server.use('/quotes', quotesRouter)


// This route must be at the end of all routes!! (express checks this route last)
server.get('*', (request, response) => {
    response
        .status(404)
        .send('Invalid URL/API path not found');
});


// Listen for any requests at port (to hit API, use url: localhost:<port>)
server.listen(port, () => {
    console.log(`Listening for requests on port ${port}`);
});
