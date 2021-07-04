import { Module } from '@nestjs/common';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksResolver, TasksService]
})
export class TasksModule {}
