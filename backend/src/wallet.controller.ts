import { Controller, Get } from '@nestjs/common';
import Pool from './dbconfig/dbconnector';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xrpl = require('xrpl');
import { watchNewAccount } from './monitor';

@Controller('wallet')
export class WalletController {
  @Get()
  async getAllWallets() {
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

      let sql = `INSERT INTO wallets (publickey,  classicAddress) VALUES (
        $1, $2)`;
      await client.query(sql, [
        test_wallet.publicKey,
        test_wallet.classicAddress,
      ]);

      sql = `INSERT INTO addresses (address) VALUES ('${test_wallet.classicAddress}')`;
      await client.query(sql);

      client.release();

      watchNewAccount(test_wallet.classicAddress);

      return test_wallet;
    } catch (error) {
      return error;
    }
  }
}
