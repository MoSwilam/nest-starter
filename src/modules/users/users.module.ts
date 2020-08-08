import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { IdeaEntity } from '../ideas/idea.entity';
import { UserResolver } from './user.resolver';
import { CommentEntity } from '../comments/comments.entity';
import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, IdeaEntity, CommentEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserResolver, CommentsService]
})
export class UsersModule {}
