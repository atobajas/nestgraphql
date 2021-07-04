import { HttpException, Injectable } from '@nestjs/common';
import { Task, TASKS } from './models/task';
import { AddTaskInput } from './dto/add-task.input';

@Injectable()
export class TasksService {
  tasks: Task[] = TASKS;

  getTasks() {
    return this.tasks;
  }

  getTask(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
  async addTask(input: AddTaskInput): Promise<Task> {
    const lastTask = this.tasks.slice(-1).pop();
    const fecha = new Date(input.creationDate);
    // console.log(fecha);
    const task: Task = new Task(
      lastTask.id + 1,
      input.title,
      input.description,
      false,
    );
    task.creationDate = fecha;
    this.tasks.push(task);
    return task;
  }
  updateTask(id: string, inputTask: AddTaskInput) {
    this.tasks = this.tasks.filter((task) => task.id != id);
    const task: Task = new Task(
      id,
      inputTask.title,
      inputTask.description,
      false,
    );
    task.creationDate = inputTask.creationDate;
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string): Task {
    const taskIndex = this.tasks.findIndex((item) => item.id === id);
    if (taskIndex === -1) {
      throw new HttpException('Task not found', 404);
    }
    const tasks = this.tasks.splice(taskIndex, 1);
    const tarea = new Task('', '', '', false);
    tarea.id = tasks[0].id;
    tarea.title = tasks[0].title;
    tarea.description = tasks[0].description;
    tarea.completed = tasks[0].completed;
    return tarea;
  }
}

