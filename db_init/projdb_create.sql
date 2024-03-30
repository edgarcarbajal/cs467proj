/*
    Creates our local database for this project. Here is where we will create the main database, with all the 
    tables we will be using. After running this file, run `projdb_init.sql` to insert dummy data into these newly created tables.

     * DISCLAIMER * 
        Make sure that you have a backup or that there is no data you want to have saved in the tables of the database of the same name we are creating!
        It will recreate the tables when run (thus dropping any exisiting tables with the same name alongside with their data!)
*/

create or replace database cs467projDB;

use cs467projDB;

/* Tables will be defined below... */

create or replace table test(
    id int AUTO_INCREMENT,  /*  Can remove AUTO_INCREMENT if you want a different way of creating IDs */
    name varchar(50),
    food varchar(50),

    primary key (id)
);


/* Added from old database.sql file (Angel) */


/*
    ENTITIES
    =========================
*/
/*list of all sale associate*/
create or replace table sales_associate(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sale_commission INT NOT NULL,
    address VARCHAR(50) NULL,

    PRIMARY KEY (id)
);

create or replace table hq_staff(
    id int not null AUTO_INCREMENT,
    username varchar(50) not null unique,
    password varchar(128) not null,
    is_admin boolean not null,

    PRIMARY KEY (id)
);

/* list of all purchase order */
create or replace table purchase_order(
    id INT NOT NULL AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sale_commission INT NOT NULL,

    PRIMARY KEY (id)
);


/* list of all quotes */
create or replace table quotes(
  id INT NOT NULL AUTO_INCREMENT,
  cust_id int NOT NULL,
  sale_id int NOT NULL,
  is_sanctioned boolean NOT NULL,
  description VARCHAR(256) NOT NULL,
  secretnotes VARCHAR(256) NOT NULL,
  price double(10,2) NOT NULL,
  cust_email varchar(128) not null,

  PRIMARY KEY (id),
  foreign key(sale_id) references sales_associate(id)
);


/*
    RELATIONSHIPS
    =========================
    - Needs to come after Entity tables since these have foreign keys!
*/

create or replace table converts( /* <-- need backticks since "convert" is reseved keyword! */
    quote_id int not null,
    staff_id int not null,
    order_id int not null,
    discount INT NOT NULL,

    primary key(quote_id, staff_id), /* <-- new purchase orders functionally depenedent on quote & hq_staff???? not sure yet */
    foreign key(quote_id) references quotes(id),
    foreign key(staff_id) references hq_staff(id),
    foreign key(order_id) references purchase_order(id)
);


create or replace table edits(
    quote_id int not null,
    staff_id int not null,

    primary key(quote_id, staff_id),
    foreign key(quote_id) references quotes(id),
    foreign key(staff_id) references hq_staff(id)
);

create or replace table manages(
    sale_id int not null,
    staff_id int not null,

    primary key(sale_id, staff_id),
    foreign key(sale_id) references sales_associate(id),
    foreign key(staff_id) references hq_staff(id)
);