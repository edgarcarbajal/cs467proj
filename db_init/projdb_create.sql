/*
    Creates our local database for this project. Here is where we will create the main database, with all the 
    tables we will be using. After running this file, run `projdb_init.sql` to insert dummy data into these newly created tables.

     * DISCLAIMER * 
        Make sure that you have a backup or that there is no data you want to have saved in the tables of the database of the same name we are creating!
        It will recreate the tables when run (thus dropping any exisiting tables with the same name alongside with their data!)
*/

create database if not exists cs467projDB;

use cs467projDB;

/* Tables will be defined below... */

create or replace table test(
    id int AUTO_INCREMENT,  /*  Can remove AUTO_INCREMENT if you want a different way of creating IDs */
    name varchar(50),
    food varchar(50),

    primary key (id)
);
