import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AddTaskInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  description: string;

  @Field()
  creationDate: Date;

  @Field()
  completed: boolean;
}
