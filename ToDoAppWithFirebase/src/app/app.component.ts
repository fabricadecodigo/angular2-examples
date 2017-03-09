import { Component } from '@angular/core';
import { TaskService } from './todo/task.service';

@Component({
  selector: 'todo-app',
  template: `<todo-task></todo-task>`,
  providers: [ TaskService ]
})
export class AppComponent { }
