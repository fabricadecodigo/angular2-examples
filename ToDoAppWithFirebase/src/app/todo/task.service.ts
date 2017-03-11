import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class TaskService {
  angularfire: AngularFire;
  items: FirebaseListObservable<any>;

  constructor(af: AngularFire) {
    this.angularfire = af;
  }

  getAll() {
    this.items = this.angularfire.database.list('/tasks');
    return this.items;
  }

  getAllCompleted() {
    this.items = this.angularfire.database.list('/tasks',  {
      query: {
        orderByChild: 'done',
        equalTo: true
      }
    });
    return this.items;
  }

  getAllOpened() {
    this.items = this.angularfire.database.list('/tasks',  {
      query: {
        orderByChild: 'done',
        equalTo: false
      }
    });
    return this.items;
  }

  add(task: Task) {
    task.done = false;
    this.items.push(task);
  }

  update(task: Task) {
    this.items.update(task.$key, task);
  }

  save(task: Task) {
    if (task.$key == null) {
      this.add(task);
    } else {
      this.update(task);
    }
  }

  remove(task: Task) {
    this.items.remove(task.$key);
  }

  toggleDone(task: Task) {
    task.done = !task.done;
    this.update(task);
  }
}
