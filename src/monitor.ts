import Pool from './dbconfig/dbconnector';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xrpl = require('xrpl');

const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
let accounts = [];

export async function Monitor() {
  try {
    await client.connect();
    client.connection.on('transaction', (ev) => {
      console.log(JSON.stringify(ev, null, 2));
    });

    client.connection.request({
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

    console.log('Update accounts DONE.');
    poolClient.release();
  } catch (error) {
    console.log(error);
    return error;
  }
}
