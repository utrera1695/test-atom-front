import { Component, Input } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TooltipModule } from "primeng/tooltip";
import { TaskModel } from "../../../../domain/models/task.model";
import { MomentPipe } from "../../../../infrastructure/pipes/momentPipe.pipe";
import { TaskStore } from "../../../../infrastructure/store/task.store";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { DeleteTasksUseCase } from "../../../../application/usecases/tasks/deletetask.usecase";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { FloatLabelModule } from "primeng/floatlabel";
import { UpdateTasksUseCase } from "../../../../application/usecases/tasks/updatetask.usecase";
import { UpdateTaskDto } from "../../../../application/dto/task/updateTask.dto";

@Component({
  selector: "app-task-card",
  standalone: true,
  imports: [
    MomentPipe,
    CommonModule,
    FormsModule,
    TooltipModule,
    ButtonModule,
    CheckboxModule,
    ToastModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    FloatLabelModule,
  ],
  templateUrl: "./task-card.component.html",
  styleUrl: "./task-card.component.scss",
  providers: [ConfirmationService, MessageService],
})
export class TaskCardComponent {
  isEditTask: boolean;
  @Input() task!: TaskModel;
  form = this.fb.group({
    title: ["", [Validators.required]],
    description: [""],
  });
  constructor(
    private fb: FormBuilder,
    private store: TaskStore,
    private confirmationService: ConfirmationService,
    private deleteTaskUseCase: DeleteTasksUseCase,
    private updateTaskUseCase: UpdateTasksUseCase,
    private messageService: MessageService
  ) {
    this.isEditTask = false;
  }

  setEditTask() {
    this.isEditTask = !this.isEditTask;
  }

  onRemoveTask() {
    this.deleteTaskUseCase.exec(this.task.id).subscribe({
      next: (response) => {
        this.store.remove(this.task.id);
        this.messageService.add({
          severity: "success",
          summary: "Excelente",
          detail: "Tarea eliminada exitosamente",
        });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "No se pudo eliminar la tarea",
        });
      },
    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: "¿Realmente quieres eliminar esta tarea?",
      header: "Eliminar tarea",
      icon: "pi pi-exclamation-triangle",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Si",
      rejectLabel: "No",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.onRemoveTask();
      },
      reject: () => {},
    });
  }
  onEditTask() {
    const data = {
      title: this.form.value.title,
      description: this.form.value.description,
    } as UpdateTaskDto;
    this.updateTaskUseCase.exec(this.task.id, data).subscribe({
      next: (response) => {
        this.setEditTask();
        this.messageService.add({
          severity: "success",
          summary: "Excelente",
          detail: "Tarea editada exitosamente",
        });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "No se pudo editar la tarea",
        });
      },
    });
  }

  onChangeStatusTask() {
    const data = {
      completed: this.task.completed,
    } as UpdateTaskDto;
    this.updateTaskUseCase.exec(this.task.id, data).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: "success",
          summary: "Excelente",
          detail: "Tarea actualizada",
        });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "No se pudo editar la tarea",
        });
      },
    });
  }
}
