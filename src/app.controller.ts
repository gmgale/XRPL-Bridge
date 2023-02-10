import { Controller, Get } from '@nestjs/common';
import Pool from './dbconfig/dbconnector';

@Controller({})
export class AppController {
  @Get()
  async getUser() {
    console.log('Hello from XRPL-Bridge');
    try {
      const client = await Pool.connect();

      const sql = 'SELECT * FROM wallets';
      const { rows } = await client.query(sql);
      const address = rows;
      console.log(address);

      client.release();

      return { address: address };
    } catch (error) {
      console.log(Error);
    }
  }
}
