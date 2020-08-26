import { Resolver, Query, ResolveField, Parent, Args, Mutation, Context } from '@nestjs/graphql';
import { IdeaService } from './idea.service';
import { CommentsService } from '../comments/comments.service';
import { IdeaDTO } from './idea.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Auth } from '../../graphql';


@Resolver()
export class IdeaResolver {
  constructor(
    private ideaService: IdeaService,
    private commentService: CommentsService
  ) {}

  @Query()
  async ideas(@Args('page') page: number, @Args('newest') newest: boolean){
    return this.ideaService.showAll(page, newest);
  }

  @Query()
  async idea(@Args('id') id: number) {
    return await this.ideaService.getById(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createIdea(
    @Args('idea') idea: string,
    @Args('description') description: string,
    @Context('user') user
  ) {
    const {id: userId} = user;
    const newIdea: IdeaDTO = {
      idea,
      description
    }
    return await this.ideaService.create(userId, newIdea);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async updateIdea(
    @Args('id') ideaId: number,
    @Args('idea') idea: string,
    @Args('description') description: string,
    @Context('user') user
  ) {
    const {id: userId} = user;
    const newIdea: IdeaDTO = {
      idea,
      description
    }
    return await this.ideaService.create(userId, newIdea);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteIdea(@Args('id') id: number, @Context('user') user) {
    const {id: userId} = user;
    return await this.ideaService.delete(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async upvote(@Args('id') id: number, @Context('user') user) {
    const {id: userId} = user;
    return await this.ideaService.upvote(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async downvote(@Args('id') id: number, @Context('user') user) {
    const {id: userId} = user;
    return await this.ideaService.downvote(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async bookmark(@Args('id') id: number, @Context('user') user) {
    const {id: userId} = user;
    return await this.ideaService.bookmarkIdea(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async unbookmark(@Args('id') id: number, @Context('user') user) {
    const {id: userId} = user;
    return await this.ideaService.unbookmarkIdea(id, userId);
  }


  @ResolveField()
  async comments(@Parent() idea) {
    return await this.commentService.showByIdea(idea.id);
  }
}