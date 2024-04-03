/*
    Populates the local project database with dummy data. Assuming you already have run `projdb_create.sql`.
*/

insert into test(name, food)
values
    ('John', 'pizza'),
    ('Mary', 'soup'),
    ('Edgar', 'tacos');


/* Dummy data for project - unhashed passwords will be written as comments for this data (dev use only!) */
/* ==================================== */
insert into sales_associate(username, password, sale_commission, address)
values
    ('mike123', 'hHnGXoQ2+Q2tjVpDWhwZYA==:opD8/EBmQ1er9HbaZ0U44BHHKptfLw2BfJpwBcCO42nSYk5JiaHHuIuyYR69tXff/Qz5PXSOy8JxgClCslCwig==', 0, '123 Average St.'),                 /* iphone123 */
    ('mary321', 'UaaKu7Tt8CT6TWZvIiXHjg==:zG+8lf+lZBAUP7PoUp0dF9yt1e2eKz5outEnT/LyOmKgIKYJx0FYGHZSFB8jqTACiL7YFOFZZC5YeyCkhpycXw==', 10, '321 Cool Dr.'),                   /* android456 */
    ('perryP103', 'iniwfIKJ5QbmxRLXGQHPYw==:f7hrSraTCuUXeuMa9azbt0sidj4nr8yZU7mGRd8ae05x1RV4SFH6Evw6SrPIjU2i+DXEqiq2Z8dEY9/hwKsEvA==', 15, '213 Leaf Ave.'),                /* windows789 */
    ('eds0101', 'QXECBYOJZjDt2K6ms/0Omg==:5sDqTas6Esz40M7SJmzVMmsyyeRn/zt/3xi0J/dojFkB8NkHAMkqJvo7ZmybqWT0jgNxpkcR/QHMLKWpA6wcfg==', 5, 'Pizza Blvd.'),                     /* macos000 */
    ('jen999', 'gwjeO1BNbOP+OwM7tzRKLQ==:wOTVFPCxWZOgmplzMI7lXLrrE+IWztmINfmbCgmfKGUlGbJX/QQlJrHWqI0/OWSmt1pjPWIZWYdTJv2PslPyHw==', 27, 'Boulder One Way'),                 /* linux101 */
    ('david1gol', 'llS8qnl+zfS6OI3CpdNMPg==:OYK0m/k3nKsvsg3T6/dXCZz1m4wOyaeSaJBgsgB8BUQGsyDMMgJdz9dowbpNXtceChKLmp9MFDj9R6LrqM1qTg==', 13, '2201 Best Employee Ct.');       /* 1random1 */

insert into hq_staff(username, password, is_admin)
values
    ('angel105', '0mlLJFNm6qoHO3zPB7tYrg==:Ql0jBZSg1PCpbjg8D9mQQFxQf6T/iYxu1PxcIkm95gS5NaV0/+lNPWtFuRQ/wPch0G5u9gprQsQ3pt5o11iihA==', true),        /* c00l$tuF5 */
    ('1sanoj', 'TsEDcK/8hkGZx2cqMOq9vA==:BIiKTbtfWcqd+gvPEg27cNgV3+wU0z37MCcIhbi5HsxST2tZCwwcpkquK4jZY0GsPldHVxiSZVZFyukHz854LQ==', true),          /* n0m0rePass */
    ('johnDoe_U', 'W2Y1Kw+B3+z1JlP1xWNZRw==:BwFCK0Qsx1dohpKOUshPLV640dZNmXXPaRIx1aMUBfuAbXP0jJM5nVQiq62TaZDMiQBqd/ws41fAFnA1w1oNlw==', false),      /* pizza */
    ('random_staff_U', 'kX9GFV4Qr/aeLTfuGLYCZA==:aeKzZHsHIsGKUwbBqMLHhBW7gfJGt0z1+qo61zmt5jlrgZQD00NuZCyzGLmHPesQH9ZBp3yBKEtn/IC+SMCAWw==', false); /* tacos */


/* Values here were actually generated from external service we will use in project! */
insert into purchase_order(id, process_date, sale_commission)
values
    ('660843aaf48737093327383a', '2024/5/13', 4),
    ('66084846f48737093327383b', '2024/5/14', 6),
    ('66084850f48737093327383c', '2024/4/19', 14);


insert into quotes(cust_id, sale_id, is_sanctioned, description, secretnotes, price, cust_email)
values
    (15, 1, true, 'Quote for the customer Grabby Grubby Meast\nPlant repair for the customer''s HQ courtyard. No repairs after 3 p.m.', 'Long-time customer eligible for higher-tier discounts', 7654.32, 'fakeemail1@cool.com'),
    (30, 2, true, 'Replacement of all plants in main office building.\nNo plants that require large maintenance.', 'New customer, try to upsell to higher service tiers', 7654.32, 'fakemeail2@wow.com'),
    (45, 1, true, '- Water plants around perimeter of building weekly\n- Large plant Service Package\n-New Customer 20% off Rebate', 'Asking for more services we can provide, maybe give better discount?', 10125.54, 'finalfake@pear.net'),
    (1, 6, false, '- Trimming hedges monday morning\n- Specialized ferilizer for flowers\n- New tree transplants', 'DNE', 549.99, 'notyet@gyahoo.org'),
    (100, 3, false, 'Testing Quote description here...', 'Testing secret notes here...', 999.99, 'lastone@netscape.tv');


insert into converts(quote_id, staff_id, order_id, discount)
values
    (1, 1, '660843aaf48737093327383a', 25),
    (2, 2, '66084846f48737093327383b', 5),
    (3, 1, '66084850f48737093327383c', 20);


insert into edits(quote_id, staff_id)
values
    (1, 1),
    (4, 2),
    (2, 3);

insert into manages(sale_id, staff_id)
values
    (1, 1),
    (6, 2);

