import mariadb from 'mariadb';

//console.log(process.env);
// Creates connection thread pool to DB. No connection extablished yet.
const dbPool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dateStrings: true,
    connectionLimit: 10
});

//Connection to legacy DB (needs port number as it should be not local (in development environment))
const legacydbPool = mariadb.createPool({
    host: process.env.LEGACYDB_HOST,
    user: process.env.LEGACYDB_USER,
    port: process.env.LEGACYDB_PORT,
    password: process.env.LEGACYDB_PASS,
    database: process.env.LEGACYDB_NAME,
    dateStrings: true,
    connectionLimit: 10
});


// export the 2 pools for use in server
export {dbPool, legacydbPool};