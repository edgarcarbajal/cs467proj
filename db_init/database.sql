/*list of all sale associate*/
CREATE TABLE sales_associate (
    sale_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sale_commission INT NOT NULL,
    address VARCHAR(50) NULL,
    PRIMARY KEY (sale_id)
);

/* list of all admin with accounts */
CREATE TABLE admin (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

/* list of all hq staff with accounts */
CREATE TABLE hq_staff (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

/* list of all purchase order */
CREATE TABLE purchase_order (
    id INT NOT NULL AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sale_commission INT NOT NULL,
    PRIMARY KEY (id)
);

/* list of all convert attruibutes */
CREATE TABLE convert (
    discount INT NOT NULL
);

/* list of all quotes */
CREATE TABLE quotes (
  id INT NOT NULL AUTO_INCREMENT,
  cust_id VARCHAR(50) NULL,
  sale_id VARCHAR(50) NULL,
  issanctioned CHAR(50) NOT NULL,
  description VARCHAR(250) NOT NULL,
  secretnotes VARCHAR(100) NOT NULL,
  price double(10,2) NOT NULL,
  PRIMARY KEY (id)
);
