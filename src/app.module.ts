import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
// import { HttpExceptionFilter } from './common/exception-filter/http.exception.filter';
// import { ValidationPipe } from './common/pipes/validation.pipe';
import { IdeaModule } from './modules/idea/idea.module';
import { HttpErrorFilter } from './common/exception-filter/error.filter';
import { AllExceptionsFilter } from './common/exception-filter/http.exception.filter';
// import { LogginInterceptor } from './common/logging.interceptor';
import { CommentsModule } from './modules/comments/comments.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [IdeaModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    UsersModule,
    CommentsModule,
    TypeOrmModule.forRoot()],
  providers: [],
})

export class AppModule {}