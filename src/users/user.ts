import { Field, Int, ObjectType } from '@nestjs/graphql';
// Clase del objeto principal de Usuario
@ObjectType()
export class User {
  @Field()
  userId: string;
  @Field()
  email: string;
  @Field(() => Int)
  age: number;
  @Field({ nullable: true })
  isSubscribed?: boolean;
}
