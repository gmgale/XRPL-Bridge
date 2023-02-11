CREATE USER docker;
CREATE DATABASE docker;
GRANT ALL PRIVILEGES ON DATABASE docker TO docker;

\connect docker;
-- TODO: Fix why below line works manually but doesnt load here
CREATE TABLE IF NOT EXISTS wallets (
  id              SERIAL PRIMARY KEY,
  address         VARCHAR(100) NULL
  );