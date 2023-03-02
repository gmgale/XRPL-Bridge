import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import Pool from '../src/dbconfig/dbconnector';
import * as fs from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // await cleanup();
    // await dbInit();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // async function cleanup() {
  //   const client = await Pool.connect();

  //   let sql = `DROP TABLE IF EXISTS wallets`;
  //   await client.query(sql);
  //   sql = `DROP TABLE IF EXISTS transactions`;
  //   await client.query(sql);
  //   sql = `DROP TABLE IF EXISTS addresses`;
  //   await client.query(sql);

  //   client.release();
  // }

  // async function dbInit() {
  //   const client = await Pool.connect();

  //   const sql = fs.readFileSync('./test/test-init.sql', 'utf8');
  //   await client.query(sql);

  //   client.release();
  // }

  afterAll(async () => {
    // await cleanup();
  });

  // Create at least one wallet for tests to use
  jest.setTimeout(10000);
  it('/wallet/new (GET) Create new wallet and funds it', async () => {
    return await request(app.getHttpServer())
      .get('/wallet/new')
      .expect(200)
      .expect(function (res) {
        if (!res.body.hasOwnProperty('publicKey'))
          throw new Error("Expected 'publicKey' key!");
        if (!res.body.hasOwnProperty('privateKey'))
          throw new Error("Expected 'privateKey' key!");
        if (!res.body.hasOwnProperty('classicAddress'))
          throw new Error("Expected 'classicAddress' key!");
        if (!res.body.hasOwnProperty('seed'))
          throw new Error("Expected 'seed' key!");
      });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/address')
      .expect(200)
      .expect(function (res) {
        if (!res.body[0].hasOwnProperty('id'))
          throw new Error("Expected 'id' key!");
        if (!res.body[0].hasOwnProperty('address'))
          throw new Error("Expected 'address' key!");
      });
  });
});
