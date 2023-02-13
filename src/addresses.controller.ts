import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';
import { AddressPatchDto } from './dto/address.patch.dto';
import Pool from './dbconfig/dbconnector';
// eslint-disable-next-line @typescript-eslint/no-var-requires

@Controller('address')
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
  async addAddress(@Body() body: AddressDto) {
    try {
      const client = await Pool.connect();

      const sql = `INSERT INTO addresses (address) VALUES ('${body.address}')`;
      const result = await client.query(sql);

      client.release();

      return result;
    } catch (error) {
      return error;
    }
  }

  @Patch()
  async updateAddress(@Body() body: AddressPatchDto) {
    try {
      const client = await Pool.connect();

      const sql = `UPDATE addresses SET address = '${body.newAddress}' where address = '${body.address}'`;
      const result = await client.query(sql);

      client.release();

      return result;
    } catch (error) {
      return error;
    }
  }

  @Delete()
  async deleteAddress(@Body() body: AddressDto) {
    try {
      const client = await Pool.connect();

      const sql = `DELETE from addresses where address = '${body.address}'`;
      const result = await client.query(sql);

      client.release();

      return result;
    } catch (error) {
      return error;
    }
  }
}
