import Pool from './dbconfig/dbconnector';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xrpl = require('xrpl');
const client = new xrpl.Client(process.env.XRPL_CLIENT);

let accounts = [];

export async function Monitor() {
  try {
    await UpdateAccounts();

    await client.connect();
    console.log('Monitor started ✅');
    client.connection.on('transaction', (tx) => {
      writeTxToDB(tx);
    });

    accounts.forEach(async (acc: string) => {
      await client.connection.request({
        command: 'subscribe',
        accounts: [acc],
      });
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

export async function watchNewAccount(acc: string) {
  try {
    await client.connection.request({
      command: 'subscribe',
      accounts: [acc],
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function writeTxToDB(tx: any) {
  console.log('Transaction for monitored addresses detected!');

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
