import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filter/http.exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { IdeaModule } from './modules/idea/idea.module';
import { HttpErrorFilter } from './common/exception-filter/error.filter';
// import { LogginInterceptor } from './common/logging.interceptor';

@Module({
  imports: [AuthModule, IdeaModule, TypeOrmModule.forRoot()],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LogginInterceptor
    // }
  ]
})
export class AppModule {};