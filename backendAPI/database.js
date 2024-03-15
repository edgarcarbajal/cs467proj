import mariadb from 'mariadb';

//console.log(process.env);
// Creates connection thread pool to DB. No connection extablished yet
const dbPool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10
});


// export the pool for use in server
export default dbPool;