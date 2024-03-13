/*
    Creates the Legacy (external) Database that this project connects to which is already setup by our instructors.
    If for whatever reason the legacy database is not online, you can recreate it locally using this file, and `legacydb_init.sql`.

    This file specifically just creates the db and the table. No data is populated. Can choose to insert in our provided dummy data,
    or provide your own `.sql` file to insert data.

    * DISCLAIMER * 
        Make sure that you have a backup or that there is no data you want to have saved in the tables of the database of the same name we are creating!
        It will recreate the tables when run (thus dropping any exisiting tables with the same name alongside with their data!)
*/

create database if not exists csci467;

use csci467;
create or replace table customers (
    id int,             /*  Can remove AUTO_INCREMENT if you want a different way of creating IDs */
    name varchar(50),
    city varchar(50),
    street varchar(50),
    contact varchar(50),

    primary key (id)
);
