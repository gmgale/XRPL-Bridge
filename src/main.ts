import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Pool from './dbconfig/dbconnector';

async function dbConnect() {
  Pool.connect(function (err: any) {
    if (err) {
      throw new Error(err);
    } else {
      console.log('Connected to database ✅');
    }
  });
}

async function bootstrap() {
  await dbConnect();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
