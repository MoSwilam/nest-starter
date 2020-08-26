import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CommentDTO } from './comments.dto';
import { Auth } from '../../graphql';

@Resolver('comment')
export class CommentsResolvers {
  constructor(private commentsService: CommentsService) {}

  @Query()
  async comment(@Args('id') id: number) {
    return await this.commentsService.showComment(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createComment(
    @Context('user') user,
    @Args('idea') ideaId: number,
    @Args('comment') comment: string
  ) {
    const data: any = { comment };
    const { id: userId } = user;
    return await this.commentsService.create(ideaId, userId, data);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteComment(@Args('comment') commentId: number, @Context('user') user) {
    const {id: userId} = user;
    return await this.commentsService.deleteComment(commentId, userId);
  }
}