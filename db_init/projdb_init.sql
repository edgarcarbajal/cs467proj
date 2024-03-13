/*
    Populates the local project database with dummy data. Assuming you already have run `projdb_create.sql`.
*/

insert into test(name, food)
values
    ('John', 'pizza'),
    ('Mary', 'soup'),
    ('Edgar', 'tacos');