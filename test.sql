-- CREATE TYPE enum_name AS ENUM
-- ('user', 'admin');

CREATE TABLE users
(
    ID int NOT NULL PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    user_role ENUM,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(25) NOT NULL,
    country_code VARCHAR(6) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN,
    dob DATE,
    gender int
); 