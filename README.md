# XRPL Bridge

## A XRPL Testnet Blockchain Ledger Monitor and Transaction Executor
A proof of concept application to monitor and send transactions on the XRPL Testnet blockchain.

⚠️ No user authentication is implemented and therefore data between the API and client is unencrypted (private keys, seed phrases etc.), use for testing purposes only and DO NOT use with Mainnet or other legitimate accounts. By using this software you agree the owner and author of this repository bares no responsibly to the misuse of this software or financial loss to the user.
️

## Running the app is as easy as:

```bash
docker compose up
```

The monitor will start automatically and listen for transactions on the ledger that match wallet addresses from the addresses table. Port 3001 is then exposed as default and can be queried with any of the below endpoints.

This application uses NestJS and Postgresql.

The frontend is currently under development can be accessed at http://0.0.0.0:3000.

## Endpoints
Endpoints can be queried with Postman here: https://www.postman.com/cloudy-meadow-777256/workspace/xrpl-bridge.

Requests and responses are detailed further below.

### Wallets

`GET /wallet` - Get all wallets from wallets table.

`GET /wallet/new` - Get a new wallet and fund from the Testnet faucet.

### Transactions

`GET /tx` - Get all transactions that have been stored by the monitor.

`POST /tx` - Create and submit a payment to the XRPL ledger.

### Addresses

`GET /address` - Get all addresses from the addresses table.

`POST /address` - Add a new address to the addresses table.

`PATCH /address` - Update an existing address on the addresses table.

`DELETE /address` - Delete an existing address from the addresses table.

## Clean install

If you need to start completely fresh, you can run:

```bash
make cbu
```
## Demoing the app

We can create a wallet, sent a transaction and store the monitors data:
1.  Query the GET /wallet/new endpoint and take note of the Seed.
2.  Query the same endpoint, this time taking note of the classicAddress. Both of these addresses will automatically added to the Wallets and Addresses tables. The monitor will immediately listen to transactions on the XRPL ledger with these account details.
3.  Query the POST /tx endpoint using the above details to make a transaction.
4.  Query the GET  /tx endpoint to see history of transactions made in the ledger.

## Endpoint Request, Responses and Examples

### Wallets

`GET /wallet`:

```bash
Request: Empty
Response: (http: 200 OK)
[
    {
        "id": 1,
        "publickey": "ED3949D822651DB05C34348A0B1FAE2289BB5448DDEDD5F3C3C0B0DF16AA9F4DC5",
        "privatekey": "ED3FB668330B201EE7B7A833FC8F75B9A0732A945D5CAF053C17AE36678913679D",
        "classicaddress": "rpDhtr9qTjMmKpxaBw8U8DAkzzTCF8ByYj",
        "seed": "sEdVZeEt29QWA2QcruFgYuPtYBJ85gd"
    },
    {
        "id": 2,
        "publickey": "ED9AC6CDBAA2425311F6B80997BB5ABE8D2EBCFE00D99CBDC4644D6725D0E8A868",
        "privatekey": "ED5074ADC8283FE616FD26F022E7657DFDA7542D808C7BBBC6E9BE7B080C09E589",
        "classicaddress": "r3Ec4e3UTuAvKDU49drqMNshwrSRrFkbZo",
        "seed": "sEdSkwNGCQiWmounCouDBmbuNKhobW9"
    }
]
```

`GET /wallet/new`:
⚠️ This data is send unencrypted, only use for test data!

```bash
Request: Empty
Response: (http: 200 OK)
{
    "publicKey": "ED41EB23A9E1754FC035216C6D8602DD1F657A9F31948A91AFC36E5B66A95604C6",
    "privateKey": "ED683532899D7BF95ED3CD09DAE32D567FF9A0A2A9F6BEF16530F4B45333D642D0",
    "classicAddress": "rfg9nFBrqGdRQNEcxQAu2XRUEEcGyuYu7u",
    "seed": "sEdSCengiJ18YBKFAJDAs11nFPVrHDp"
}
```

## Transactions

`GET /tx`:

```bash
Request: Empty
Response: (http: 200 OK)
[
    {
        "id": 1,
        "ledgerindex": 35353194,
        "ledgerhash": "B94F60DAD16EE7118B5F9836D48624EFC62901F24DB77F8E35A60C4EBDBCF7C1",
        "account": "rff5WQCE6LeqKUrcqaum6nK38XFHgvDu1n",
        "destination": "rfg9nFBrqGdRQNEcxQAu2XRUEEcGyuYu7u",
        "ammount": 100,
        "fee": 12,
        "txsig": "2B0740BF7498F44BC543F835419F00FA32C9BEA3D85D284F670134BA57D317AD00F28C066E66C0FCECF0774C170318A36A97DE9FB7975762A34A8669E72CB307"
    }
]
```

`POST /tx`:
⚠️ This data is send unencrypted, only use test data!

```bash
Request:
{
  "TransactionType": "Payment",
  "Seed": "sEd7sRFNfHV5Eo7453EDncJCR3BFcnM",
  "Amount": "100",
  "Destination": "rfg9nFBrqGdRQNEcxQAu2XRUEEcGyuYu7u"
}
Response: (http: 200 OK)
[
  {
    "account": "rfg9nFBrqGdRQNEcxQAu2XRUEEcGyuYu7u",
    "balances": [
      {
        "currency": "XRP",
        "value": "0.0001"
      }
    ]
  },
{
  "account": "rff5WQCE6LeqKUrcqaum6nK38XFHgvDu1n",
  "balances": [
      {
        "currency": "XRP",
        "value": "-0.000112"
      }
    ]
  }
]
```

### Addresses

`GET /address`:

```bash
Request: Empty
Response: (http: 200 OK)
[
    {
        "id": 1,
        "address": "rff5WQCE6LeqKUrcqaum6nK38XFHgvDu1n"
    },
    {
        "id": 2,
        "address": "rfg9nFBrqGdRQNEcxQAu2XRUEEcGyuYu7u"
    },
]
```

`POST /address`:

```bash
Request:
{
    "address": "rff5WQCE6LeqKUrcqaum6nK38XFHgvDu1n"
}
Response: Empty (http 201: Created)
```

`PATCH /address`:

```bash
Request:
{
    "address": "rff5WQCE6LeqKUrcqaum6nK38XFHgvDu1n",
    "newAddress": "rff5WQCE6LeqKUrcqaum6nK38XFHgvDu1"
}
Response: Empty (http 204: OK)
```

`DELETE /address`:

```bash
Request:
{
    "address": "rff5WQCE6LeqKUrcqaum6nK38XFHgvDu1n"
}
Response: Empty (http 204: OK)
```

## For development

You may start a Postgresql Docker container separately and develop the application using your editor with the following instructions:
(Database connection will be automatically handled or can be manually configured in .env)

## Installation

```bash
$ npm install
```

## Running the app

```bash
Start the PostgreSQL docker image manually.
$ npm run start:dev

```

## Stay in touch

- Author - [George Gale](mailto:gmgale@icloud.com)

