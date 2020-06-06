import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filter/http.exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Module({
  imports: [AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {};