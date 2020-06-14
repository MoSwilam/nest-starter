import 'dotenv'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe())
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Nes app started on port ${port}`, `MAIN.TS`)
}
bootstrap();
