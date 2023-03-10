CREATE USER docker;
CREATE DATABASE docker WITH OWNER docker;
GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
\connect docker docker;

CREATE TABLE IF NOT EXISTS addresses (
  id              SERIAL PRIMARY KEY,
  address         VARCHAR(35) NULL
  );


CREATE TABLE IF NOT EXISTS transactions (
  id              SERIAL PRIMARY KEY,
  ledgerIndex     INTEGER,
  ledgerHash      VARCHAR(100) NOT NULL,
  account         VARCHAR(35) NOT NULL,
  destination     VARCHAR(35) NOT NULL,
  ammount         INTEGER NOT NULL,
  fee             INTEGER NOT NULL,
  txSig           VARCHAR(128) NOT NULL
  );

CREATE TABLE IF NOT EXISTS wallets (
  id              SERIAL PRIMARY KEY,
  publickey       VARCHAR(100) NOT NULL,
  classicAddress  VARCHAR(35)  NOT NULL
  );
