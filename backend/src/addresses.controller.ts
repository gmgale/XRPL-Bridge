import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AddressDto } from './dto/address.dto';
import { AddressPatchDto } from './dto/address.patch.dto';
import Pool from './dbconfig/dbconnector';
import { watchNewAccount, stopWatchingAccount } from './monitor';
// eslint-disable-next-line @typescript-eslint/no-var-requires

@Controller('addresses')
export class AddressesController {
  @Get()
  async getUser() {
    try {
      const client = await Pool.connect();

      const sql = 'SELECT * FROM addresses';
      const { rows } = await client.query(sql);
      const address = rows;

      client.release();

      return address;
    } catch (error) {
      return error;
    }
  }

  @Post()
  @HttpCode(201)
  async addAddress(@Body() body: AddressDto) {
    try {
      const client = await Pool.connect();

      const sql = `INSERT INTO addresses (address) VALUES ($1)`;
      const result = await client.query(sql, [body.address]);

      client.release();

      watchNewAccount(body.address);

      return;
    } catch (error) {
      return error;
    }
  }

  @Patch()
  @HttpCode(204)
  async updateAddress(@Body() body: AddressPatchDto) {
    try {
      const client = await Pool.connect();

      const sql = `UPDATE addresses SET address = ($1) where address = ($2)`;
      const result = await client.query(sql, [body.newAddress, body.address]);

      client.release();

      stopWatchingAccount(body.address);
      watchNewAccount(body.newAddress);

      return;
    } catch (error) {
      return error;
    }
  }

  @Delete()
  @HttpCode(204)
  async deleteAddress(@Body() body: AddressDto) {
    try {
      const client = await Pool.connect();

      const sql = `DELETE from addresses where address = ($1)`;
      const result = await client.query(sql, [body.address]);

      client.release();

      stopWatchingAccount(body.address);

      return;
    } catch (error) {
      return error;
    }
  }
}
