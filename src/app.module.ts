import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { MonitorController } from './monitor.controller';
import { TxController } from './tx.controller';
import { WalletController } from './wallet.controller';

@Module({
  controllers: [
    AddressesController,
    MonitorController,
    TxController,
    WalletController,
  ],
})
export class AppModule {}
