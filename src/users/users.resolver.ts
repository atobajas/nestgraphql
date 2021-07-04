import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetUserArgs } from './dto/get-user.args';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user';
import { UsersService } from './users.service';
@Resolver(() => User) // Dato a manejar
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /*
  query {
  user(userId: "5fa5d6b0-274c-4504-b90f59f5c2ccd438")
  {
    userId, email, age, isSubscribed
  }
  }
*/
  @Query(() => User, { name: 'user', nullable: true }) // definición de la consulta
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.usersService.getUser(getUserArgs);
  }

  /* Ejemplo
  mutation{
 createUser(createUserData: {
 email: "pepesan@gmail.com",
 age: 42}) {
 userId, email, age, isSubscribed
 }
}
*/
  @Mutation(() => User) // definición de la mutación para crear un usuario
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    return this.usersService.createUser(createUserData);
  }
}
