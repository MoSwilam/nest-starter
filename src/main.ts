import 'dotenv'
import { NestFactory, ModuleRef, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AllExceptionsFilter } from './common/exception-filter/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;

  const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.use(compression());
  app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Nes app started on port ${port}`, `MAIN.TS`);
}
bootstrap();
