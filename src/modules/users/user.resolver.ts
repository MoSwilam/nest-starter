import { Resolver, Query, ResolveProperty, Parent, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CommentsService } from '../comments/comments.service';
import { UserDTO } from './user.dto';


@Resolver('User')
export class UserResolver {
  constructor(
      private userService: UsersService,
      private commentService: CommentsService
    ) {}

  @Query()
  users(){
    return this.userService.showAll()
  }

  @Mutation()
  register(@Args('email') email: string, @Args('password') password: string) {
    const user: UserDTO = {email, password}
    return this.userService.register(user);
  }

  @Mutation()
  login(@Args() {email, password}) {
    const user: UserDTO = {email, password};
    return this.userService.login(user);
  }

  @ResolveProperty()
  comments(@Parent() user) {
    const { id } = user;
    return this.commentService.showByUser(id);
  }
}