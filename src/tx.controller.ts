import { Controller, Post, Get, Body } from '@nestjs/common';
import { TxDto } from './dto/tx.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xrpl = require('xrpl');
import Pool from './dbconfig/dbconnector';

@Controller('tx')
export class TxController {
  @Post()
  async send(@Body() body: TxDto) {
    try {
      const wallet = xrpl.Wallet.fromSeed(body.Seed);

      const client = new xrpl.Client(process.env.XRPL_CLIENT);
      await client.connect();

      // Prepare transaction -------------------------------------------------------
      const prepared = await client.autofill({
        TransactionType: body.TransactionType,
        Account: wallet.address,
        Amount: body.Amount,
        Destination: body.Destination,
      });

      const max_ledger = prepared.LastLedgerSequence;

      // Sign prepared instructions ------------------------------------------------
      const signed = wallet.sign(prepared);

      // Submit signed blob --------------------------------------------------------
      const tx = await client.submitAndWait(signed.tx_blob);

      // Check transaction results -------------------------------------------------
      const balance = JSON.stringify(
        xrpl.getBalanceChanges(tx.result.meta),
        null,
        2,
      );

      client.disconnect();
      return balance;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get()
  async getAllTransactions() {
    try {
      const client = await Pool.connect();

      const sql = 'SELECT * FROM transactions';
      const { rows } = await client.query(sql);
      const tx = rows;

      client.release();

      return tx;
    } catch (error) {
      return error;
    }
  }
}
