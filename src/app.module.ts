import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
// import { HttpExceptionFilter } from './common/exception-filter/http.exception.filter';
// import { ValidationPipe } from './common/pipes/validation.pipe';
import { IdeaModule } from './modules/ideas/idea.module';
import { HttpErrorFilter } from './common/exception-filter/error.filter';
import { AllExceptionsFilter } from './common/exception-filter/http.exception.filter';
import { CommentsModule } from './modules/comments/comments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

@Module({
  imports: [IdeaModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: true,
      context: ({req}) => req,
    }),
    UsersModule,
    CommentsModule,
    TypeOrmModule.forRoot()],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})

export class AppModule {}