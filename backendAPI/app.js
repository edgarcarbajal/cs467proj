// Using "type": "module" in package.json in order to use ES Modules import statements
import express from 'express';

// init express
const app = express();
const port = process.env.port ||  8000;

//middleware calls (adding useful functionallity to express)
app.use(express.json());


// API Routes
app.get('/', (request, response) => {
    response
        .status(200)
        .send('Hello world! first API!!');
});

app.get('/test/:name/:id', (request, response) => {
    response
        .status(200)
        .send('id: ' + request.params.id + ' and name: ' + request.params.name);
});

// This route must be at the end of all routes!! (express checks this route last)
app.get('*', (request, response) => {
    response
        .status(200)
        .send('Invalid URL');
});


// Listen for any requests at port (to hit API, use url: localhost:<port>)
app.listen(port);
