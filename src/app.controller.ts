import { Controller, Get, Post, Body } from '@nestjs/common';
import { AddressDto } from './address.dto';
import Pool from './dbconfig/dbconnector';

@Controller({})
export class AppController {
  @Get()
  async getUser() {
    console.log('Hello from XRPL-Bridge');
    try {
      const client = await Pool.connect();

      const sql = 'SELECT * FROM addresses';
      const { rows } = await client.query(sql);
      const address = rows;
      console.log(address);

      client.release();

      return address;
    } catch (error) {
      console.log(Error);
      return error;
    }
  }

  @Post()
  async createAddress(@Body() body: AddressDto) {
    try {
      const client = await Pool.connect();

      const sql = `INSERT INTO addresses (address) VALUES ('${body.address}')`;
      console.log(sql);
      const result = await client.query(sql);

      client.release();

      return result;
    } catch (error) {
      console.log(Error);
      return error;
    }
  }
  // console.log(address);
  // return address;
}
