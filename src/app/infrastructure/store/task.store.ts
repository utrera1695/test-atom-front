import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TaskModel } from "../../domain/models/task.model";

@Injectable({ providedIn: "root" })
export class TaskStore {
  private tasksSubject = new BehaviorSubject<TaskModel[]>([
    /*     {
      id: "1",
      title: "Hola 1",
      description: "esto es una prueba",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Hola 2",
      description: "esto es una prueba",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Hola 3",
      description: "esto es una prueba",
      completed: false,
      createdAt: new Date(),
    }, */
  ]);

  tasks$: Observable<TaskModel[]> = this.tasksSubject.asObservable();

  set(tasks: TaskModel[]) {
    this.tasksSubject.next(tasks);
  }
  add(task: TaskModel) {
    this.tasksSubject.next([task, ...this.tasksSubject.value]);
  }

  remove(id: string) {
    this.tasksSubject.next(this.tasksSubject.value.filter((t) => t.id !== id));
  }
}
