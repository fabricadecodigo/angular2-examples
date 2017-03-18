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
    // Ao iniciar o componente, busco todos os items já existentes no Firebase.
    this.tasks = this.taskService.getAll();
  }

  saveTask() {
    // Se os campos do formulario foram preenchidos, adiciono a nova tarefa.
    if (this.task.title && this.task.description) {
      this.taskService.save(this.task);
      this.task = new Task();
    }
  }

  editTask(task: Task) {
    // Ao clicar 2x em um item da lista e vai para o formulário para ser editado.
    this.task = task;
  }

  remove(task: Task) {
    this.taskService.remove(task);
  }

  toggleDone(task: Task) {
    this.taskService.toggleDone(task);
  }

  filterTasks(filter: number) {
    // Filtrando os itens
    switch (filter) {
      case 1: // Todos
        this.tasks = this.taskService.getAll();
        break;
      case 2: // Todas tarefas em aberto
        this.tasks = this.taskService.getAllOpened();
        break;
      case 3: // Todas tarefas concluídas
        this.tasks = this.taskService.getAllCompleted();
        break;
    }
  }
}
