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


/* Line Items JSON structure:
    {
        line_items: [
            {
                description: "line item description goes here...",
                price: (line item price goes here)
            },
            {...more line items similar to above go inside array!},
            {...},
            .
            .
            .
        ]
    }
*/
/* Secret Notes JSON Structure:
    {
        secretnotes : [
            "secret note #0 description...",
            "secret note #1 description...",
            "secret note #2 description...",
            .
            .
            .
        ]
    }
*/
insert into quotes(cust_id, sale_id, is_finalized, is_sanctioned, line_items, secretnotes, cust_email)
values
    (15, 1, true, true, '{"line_items": [{"description": "New Plants", "price": 1234}, {"description": "Premium Fertilizer", "price": 500}]}', '{"secretnotes": ["give good discount", "valued customer"]}', 'fakeemail1@cool.com'),
    (30, 2, true, true, '{"line_items": [{"description": "New Pots", "price": 200}, {"description": "Regular Fertilizer", "price": 100}]}', '{"secretnotes": ["New Customer", "Upsell to premium package"]}', 'fakemeail2@wow.com'),
    (45, 1, true, false, '{"line_items": [{"description": "Watering Service", "price": 1500}, {"description": "Greenhouse Maintenance", "price": 500}]}', '{"secretnotes": []}', 'finalfake@pear.net'),
    (1, 6, false, false, '{"line_items": [{"description": "Trimming Service", "price": 450}]}', '{"secretnotes": ["Has 20% rebate, check later if applicable"]}', 'notyet@gyahoo.org'),
    (100, 3, false, false, '{"line_items": [{"description": "Landscaping", "price": 220}]}', '{"secretnotes": ["test secret note!"]}', 'lastone@netscape.tv');


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

