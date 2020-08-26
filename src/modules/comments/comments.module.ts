import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity } from '../ideas/idea.entity';
import { UserEntity } from '../users/user.entity';
import { CommentEntity } from './comments.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsResolvers } from './comments.resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity, CommentEntity])],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsResolvers]
})
export class CommentsModule {}
