/*
    Populates the legacy database with dummy data. Assuming you already have run `legacydb_create.sql`.
*/

insert into customers(name, city, street, contact)
values
    ('IBM Corporation', 'Armonk, New York', '1 Orchard Road', 'fakeIBMemail@wow.co'),
    ('Ege Consulting, Inc.', 'DeKalb, Illinois', '600694 Carroll Ave.', 'fakeEgeEmail@cool.net'),
    ('Excelsior Mutants', 'Nowhere, World', '987 Mutant Ln', 'excelsiorM@nowhere.mvp');