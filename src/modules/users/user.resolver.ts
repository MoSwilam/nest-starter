import { Resolver, Query } from '@nestjs/graphql';


@Resolver('User')
export class UserResolver {
  @Query()
  users(){
    return [{
      id: 5,
      username: 'username'
    }]
  }
}