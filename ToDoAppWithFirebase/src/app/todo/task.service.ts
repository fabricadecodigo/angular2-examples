import { Injectable } from '@angular/core';

import { Task } from './task.model';

export const TASKS: Task[] = [
  {done: false, title: 'Item 1'},
  {done: true, title: 'Item 2'},
  {done: false, title: 'Item 3'},
];

@Injectable()
export class TaskService {
  getAll() {
    return Promise.resolve(TASKS);
  }

  add(task: Task) {
    TASKS.push(task);
  }

  save(task: Task) {
    if (TASKS.indexOf(task) < 0) {
      this.add(task);
    }
  }

  remove(task: Task) {
    TASKS.splice(TASKS.indexOf(task), 1);
  }

  toggleDone(task: Task) {
    task.done = !task.done;
  }
}
