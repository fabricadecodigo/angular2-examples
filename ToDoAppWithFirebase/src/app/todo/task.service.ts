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
    // Buscando todos os itens no no "/task"
    this.items = this.angularfire.database.list('/tasks');
    return this.items;
  }

  getAllCompleted() {
    // Buscando todos os itens que estão completos
    this.items = this.angularfire.database.list('/tasks',  {
      query: {
        orderByChild: 'done', // filtrando pelo campo "done"
        equalTo: true // e que tanha o valor true
      }
    });
    return this.items;
  }

  getAllOpened() {
    // Buscando todos os itens que estão em aberto
    this.items = this.angularfire.database.list('/tasks',  {
      query: {
        orderByChild: 'done', // filtrando pelo campo "done"
        equalTo: false // e que tanha o valor false
      }
    });
    return this.items;
  }

  add(task: Task) {
    // Adicionando uma nova tarefa.
    // Toda nova tarefa é gravada como em aberto por padrão.
    task.done = false;

    // Adicionando o item na lista de itens. 
    // Como essa lista é carregada antes, automaticamente o angularfire2
    // identifica a mudança na lista e inclui o item novo.
    this.items.push(task);
  }

  update(task: Task) {
    // Atualizando o item na lista.
    // Para isso passamos por parametro qual é o id do item no Firebase
    // e quais são os novos valores.
    this.items.update(task.$key, task);
  }

  save(task: Task) {
    // Metodo criado para facilitar a inclusão/alteração e um item.
    // Verifico se o item tem o Id para saber se é uma inclusão ou alteração.
    if (task.$key == null) {
      this.add(task);
    } else {
      this.update(task);
    }
  }

  remove(task: Task) {
    // Removendo um item da lista
    this.items.remove(task.$key);
  }

  toggleDone(task: Task) {
    // Marcando uma tarefa como concluída ou em aberto.
    task.done = !task.done;
    this.update(task);
  }
}
