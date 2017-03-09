import { Component, OnInit, Input } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'todo-task',
  templateUrl: 'app/todo/task.component.html'
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  task: Task;

  constructor(private taskService: TaskService) {
    this.task = new Task();
  }

  ngOnInit() {
    this.taskService.getAll()
      .then(t => this.tasks = t);
  }

  saveTask() {
    this.taskService.save(this.task);
    this.task = new Task();
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
}
