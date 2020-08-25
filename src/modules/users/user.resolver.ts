import { Resolver, Query, ResolveField, Parent, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CommentsService } from '../comments/comments.service';
import { UserDTO } from './user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';


@Resolver('User')
export class UserResolver {
  constructor(
      private userService: UsersService,
      private commentService: CommentsService
    ) {}

  @Mutation()
  async register(@Args('email') email: string, @Args('password') password: string) {
    const user: UserDTO = {email, password}
    return await this.userService.register(user);
  }

  @Mutation()
  async login(@Args() {email, password}) {
    const user: UserDTO = {email, password};
    return await this.userService.login(user);
  }

  @Query()
  async users(@Args('page') page: number){
    return await this.userService.showAll()
  }

  @Query()
  async user(@Args('email') email: string) {
    return await this.userService.read(email);
  }

  @Query()
  @UseGuards(new AuthGuard())
  async me(@Context('user') user) {
    const {email} = user;
    return await this.userService.read(email);
  }

  @ResolveField()
  comments(@Parent() user) {
    return this.commentService.showByUser(user.id);
  }
}