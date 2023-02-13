import { Controller, Get } from '@nestjs/common';
import Pool from './dbconfig/dbconnector';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xrpl = require('xrpl');

@Controller('wallet')
export class WalletController {
  @Get()
  async getUser() {
    try {
      const client = await Pool.connect();

      const sql = 'SELECT * FROM wallets';
      const { rows } = await client.query(sql);
      const address = rows;

      client.release();

      return address;
    } catch (error) {
      return error;
    }
  }

  @Get('new')
  async newWallet() {
    try {
      const XRPLclient = new xrpl.Client(process.env.XRPL_CLIENT);
      await XRPLclient.connect();

      // Create a wallet and fund it with the Testnet faucet:
      const fund_result = await XRPLclient.fundWallet();
      const test_wallet = fund_result.wallet;

      XRPLclient.disconnect();

      const client = await Pool.connect();

      let sql = `INSERT INTO wallets (publickey, privatekey, classicAddress, seed) VALUES ('${test_wallet.publicKey}', '${test_wallet.privateKey}', '${test_wallet.classicAddress}', '${test_wallet.seed}')`;
      await client.query(sql);

      sql = `INSERT INTO addresses (address) VALUES ('${test_wallet.classicAddress}')`;
      await client.query(sql);

      client.release();

      return test_wallet;
    } catch (error) {
      return error;
    }
  }
}
