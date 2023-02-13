import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { AddressesController } from './addresses.controller';
import { TxController } from './tx.controller';
import { Monitor } from './monitor';

@Module({
  controllers: [AddressesController, TxController, WalletController],
})
export class AppModule {
  constructor() {
    Monitor();
  }
}
