import { Controller, Get, Post, Body } from '@nestjs/common';
import { TxDto } from './dto/tx.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xrpl = require('xrpl');

@Controller('tx')
export class TxController {
  @Post()
  async send(@Body() body: TxDto) {
    try {
      const wallet = xrpl.Wallet.fromSeed(body.Seed);

      // Define the network client
      const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
      await client.connect();

      // Prepare transaction -------------------------------------------------------
      const prepared = await client.autofill({
        TransactionType: body.TransactionType,
        Account: wallet.address,
        Amount: body.Amount,
        Destination: body.Destination,
      });

      const max_ledger = prepared.LastLedgerSequence;
      console.log('Prepared transaction instructions:', prepared);
      console.log('Transaction cost:', xrpl.dropsToXrp(prepared.Fee), 'XRP');
      console.log('Transaction expires after ledger:', max_ledger);

      // Sign prepared instructions ------------------------------------------------
      const signed = wallet.sign(prepared);
      console.log('Identifying hash:', signed.hash);
      console.log('Signed blob:', signed.tx_blob);

      // Submit signed blob --------------------------------------------------------
      const tx = await client.submitAndWait(signed.tx_blob);

      // Check transaction results -------------------------------------------------
      console.log('Transaction result:', tx.result.meta.TransactionResult);
      const balance = JSON.stringify(
        xrpl.getBalanceChanges(tx.result.meta),
        null,
        2,
      );
      console.log('Balance changes:', balance);

      client.disconnect();
      return balance;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
