import { Resolver, Query, ResolveProperty, Parent } from '@nestjs/graphql';
import { IdeaService } from './idea.service';
import { CommentsService } from '../comments/comments.service';


@Resolver()
export class IdeaResolver {
  constructor(
    private ideaService: IdeaService,
    private commentService: CommentsService
  ) {}

  @Query()
  ideas(){
    return this.ideaService.showAll();
  }

  @ResolveProperty()
  comments(@Parent() idea) {
    const { id } = idea;
    return this.commentService.showByIdea(id);

  }
}