import { Component, OnInit } from "@angular/core";
import { TaskCardComponent } from "../task-card/task-card.component";
import { CommonModule } from "@angular/common";
import { TaskStore } from "../../../../infrastructure/store/task.store";
import { ProgressBarModule } from "primeng/progressbar";
import { ListTasksUseCase } from "../../../../application/usecases/tasks/listtasks.usecase";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { BehaviorSubject, Observable } from "rxjs";
import { Task } from "../../../../domain/entities/task.entity";
import { SelectButtonModule } from "primeng/selectbutton";
import { FormsModule } from "@angular/forms";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-list-tasks",
  standalone: true,
  imports: [
    CommonModule,
    TaskCardComponent,
    ProgressBarModule,
    ToastModule,
    SelectButtonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: "./list-tasks.component.html",
  styleUrl: "./list-tasks.component.scss",
  providers: [MessageService],
})
export class ListTasksComponent implements OnInit {
  tasks$: Observable<any>;
  allTasks: any[] = [];
  filteredTasks$ = new BehaviorSubject<any[]>([]);
  search: string = "";

  filterStatus = 0;
  filterOptions: any[] = [
    { name: "Completadas", value: 1 },
    { name: "Pendientes", value: 2 },
  ];

  constructor(
    private store: TaskStore,
    private listTasksUseCase: ListTasksUseCase,
    private messageService: MessageService
  ) {
    this.tasks$ = this.store.tasks$;
  }
  ngOnInit() {
    this.tasks$.subscribe((tasks) => {
      this.allTasks = tasks;
      this.applyFilter(); // cada vez que llegue nueva data, refiltro
    });
    this.listTasksUseCase.exec().subscribe({
      next: (response) => {
        this.store.set(response);
      },
      error: (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.error.error,
        });
      },
    });
  }

  trackByTask(_: number, task: Task) {
    return task.id;
  }

  applyFilter() {
    let result = [...this.allTasks];

    // Filtro por search
    if (this.search.trim()) {
      const txt = this.search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(txt));
    }

    // Filtro por estado
    if (this.filterStatus == 1) {
      result = result.filter((t) => t.completed === true);
    } else if (this.filterStatus == 2) {
      result = result.filter((t) => t.completed === false);
    }

    this.filteredTasks$.next(result);
  }
}
