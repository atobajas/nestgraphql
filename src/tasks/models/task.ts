import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  completed: boolean;

  @Field()
  creationDate: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    completed: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.creationDate = new Date(1560310196901);
  }
}
const task1: Task = new Task(
  '1',
  'Task #1',
  'This is the description for the task #1',
  false,
);
export const TASKS: Task[] = [
  task1,
  /*
  {
    id: '2',
    title: 'Task #2',
    description: 'This is the description for the task #2',
    completed: false,
    creationDate: new Date('2019-06-12T03:29:56.901Z'),
  },
  {
    id: '3',
    title: 'Task #3',
    description: 'This is the description for the task #3',
    completed: true,
    creationDate: new Date('2019-06-12T03:29:56.901Z'),
  },
  {
    id: '4',
    title: 'Task #4',
    description: 'This is the description for the task #4',
    completed: false,
    creationDate: new Date('2019-06-12T03:29:56.901Z'),
  },
  {
    id: '5',
    title: 'Task #5',
    description: 'This is the description for the task #5',
    completed: true,
    creationDate: new Date('2019-06-12T03:29:56.901Z'),
  },
  {
    id: '6',
    title: 'Task #6',
    description: 'This is the description for the task #6',
    completed: false,
    creationDate: new Date('2019-06-12T03:29:56.901Z'),
  },
  {
    id: '7',
    title: 'Task #7',
    description: 'This is the description for the task #7',
    completed: false,
    creationDate: new Date('2019-06-12T03:29:56.901Z'),
  },

   */
];
