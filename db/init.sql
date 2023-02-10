CREATE USER docker;
CREATE DATABASE docker;
GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
-- TODO: Fix why below line works manually but doesnt load here
CREATE TABLE IF NOT EXISTS wallets (address VARCHAR(100), PRIMARY KEY (address));