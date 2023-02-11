CREATE USER docker;
CREATE DATABASE docker WITH OWNER docker;
GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
\connect docker docker;

CREATE TABLE IF NOT EXISTS addresses (
  id              SERIAL PRIMARY KEY,
  address         VARCHAR(35) NULL
  );