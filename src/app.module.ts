import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { IdeaModule } from './modules/ideas/idea.module';
import { HttpErrorFilter } from './common/exception-filter/error.filter';
import { AllExceptionsFilter } from './common/exception-filter/http.exception.filter';
import { CommentsModule } from './modules/comments/comments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { join } from 'path';

@Module({
  imports: [IdeaModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: false,
      context: ({ req }) => ({ headers: req.headers }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      }
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