import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { AddTaskInput } from './dto/add-task.input';
import { Task } from './models/task';
import { PubSub } from 'apollo-server-express';

@Resolver((of) => 'Tasks')
export class TasksResolver {
  private pubSub = new PubSub(); // inicialización particular de PubSub
  constructor(private readonly taskService: TasksService) {}
  /*
  Ejemplo de consulta de subscripción
  subscription {
    taskAdded{
      id
      title
    }
  }
  */
 
  @Subscription((returns) => Task) // Definición de Subscripción
  async taskAdded() {
    return this.pubSub.asyncIterator('taskAdded');
  }

  /*
   Consulta
   Ejemplo:
   query {
    getTasks{
      id, title
    }
   }
   */
  @Query((type) => [Task])
  async getTasks() {
    return this.taskService.getTasks();
  }

  /*
    Read by ID

    Ejemplo Consulta:
    query{
      getTask(id: "1"){
        id, title, description
      }
    }
   */
  @Query((type) => Task)
  async getTask(@Args('id') id: string) {
    return this.taskService.getTask(id);
  }
  /*
  Add
  Ejemplo Mutación
  mutation{
    addTask(input:{
      title: "uno",
      description:"desc",
      completed: true,
      creationDate: 1560310196901
    }){
      id,
      title,
      description,
    	completed
    }
  }
  */
  @Mutation((type) => Task)
  async addTask(@Args('input') input: AddTaskInput) {
    const taskAdded = await this.taskService.addTask(input);
    //console.log(taskAdded);
    await this.pubSub.publish('taskAdded', { taskAdded: taskAdded });
    return taskAdded;
  }
  /*
    Edit By ID
    Ejemplo de Consulta:
    mutation{
        updateTask(id: "1", input:{
          title: "unomod",
          description:"desc mod "
        }){
          id,
          title,
          description
        }
      }
   */
  @Mutation((type) => Task)
  async updateTask(@Args('id') id: string, @Args('input') input: AddTaskInput) {
    return this.taskService.updateTask(id, input);
  }
  /*
    Delete by ID
    Ejemplo de mutación:
    mutation{
      deleteTask(id: "1"){
        id, title
      }
    }
   */
  @Mutation((type) => Task)
  async deleteTask(@Args('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
