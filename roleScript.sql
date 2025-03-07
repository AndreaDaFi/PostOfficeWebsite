CREATE TABLE ROLE (
    role_id INT,
    CHECK (id >= 100000 AND id <= 999999),
    role_name VARCHAR(20)
);

--testing --
