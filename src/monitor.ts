import Pool from './dbconfig/dbconnector';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xrpl = require('xrpl');

const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
let accounts = [];

export async function Monitor() {
  try {
    await client.connect();
    client.connection.on('transaction', (tx) => {
      // console.log('Tx-START\n', JSON.stringify(tx, null, 2), '\nTx-END');
      writeTxtoDB(tx);
    });

    await client.connection.request({
      command: 'subscribe',
      accounts: accounts,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function UpdateAccounts() {
  try {
    if (client.isConnected()) {
      client.disconnect();
    }
    const poolClient = await Pool.connect();

    const sql = 'SELECT * FROM addresses';
    const { rows } = await poolClient.query(sql);
    const addressArr = rows;
    accounts = addressArr.map((e) => {
      return e.address;
    });

    poolClient.release();
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function writeTxtoDB(tx: any) {
  const client = await Pool.connect();

  const sql = `INSERT INTO transactions (
    ledgerIndex, 
    ledgerHash,  
    account,     
    destination, 
    ammount,     
    fee,         
    txSig
    ) VALUES (
      '${tx.ledger_index}',
      '${tx.ledger_hash}', 
      '${tx.transaction.Account}', 
      '${tx.transaction.Destination}', 
      '${tx.transaction.Amount}', 
      '${tx.transaction.Fee}', 
      '${tx.transaction.TxnSignature}'
    )`;

  await client.query(sql);

  client.release();
}
