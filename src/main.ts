import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Pool from './dbconfig/dbconnector';

async function dbConnect() {
  Pool.connect(function (err: any, client, done) {
    if (err) throw new Error(err);
    console.log('Connected');
  });
}

async function bootstrap() {
  await dbConnect();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
