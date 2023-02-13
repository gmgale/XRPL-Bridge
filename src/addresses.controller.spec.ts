import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import Pool from '../src/dbconfig/dbconnector';
import * as fs from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
