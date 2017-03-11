import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'todo-task',
  templateUrl: 'app/todo/task.component.html'
})
export class TaskComponent implements OnInit {
  tasks: FirebaseListObservable<any>;
  task: Task;

  constructor(private taskService: TaskService) {
    this.task = new Task();
  }

  ngOnInit() {
    this.tasks = this.taskService.getAll();
  }

  saveTask() {
    if (this.task.title && this.task.description) {
      this.taskService.save(this.task);
      this.task = new Task();
    }
  }

  editTask(task: Task) {
    this.task = task;
  }

  remove(task: Task) {
    this.taskService.remove(task);
  }

  toggleDone(task: Task) {
    this.taskService.toggleDone(task);
  }

  filterTasks(filter: number) {
    switch (filter) {
      case 1:
        this.tasks = this.taskService.getAll();
        break;
      case 2:
        this.tasks = this.taskService.getAllOpened();
        break;
      case 3:
        this.tasks = this.taskService.getAllCompleted();
        break;
    }
  }
}
