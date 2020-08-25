import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { IdeaService } from './idea.service';
import { CommentsService } from '../comments/comments.service';


@Resolver()
export class IdeaResolver {
  constructor(
    private ideaService: IdeaService,
    private commentService: CommentsService
  ) {}

  @Query()
  ideas(@Args('page') page: number, @Args('newest') newest: boolean){
    return this.ideaService.showAll(page, newest);
  }

  @ResolveField()
  comments(@Parent() idea) {
    return this.commentService.showByIdea(idea.id);
  }
}