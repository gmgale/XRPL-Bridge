import { Module, CacheInterceptor, CacheModule } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { AddressesController } from './addresses.controller';
import { TxController } from './tx.controller';
import { Monitor } from './monitor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register({
      ttl: 2, // seconds
      max: 10, // maximum number of items in cache
      isGlobal: true,
    }),
  ],
  controllers: [AddressesController, TxController, WalletController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {
  constructor() {
    Monitor();
  }
}
