import { Component } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CreateTaskUseCase } from "../../../../application/usecases/tasks/createtask.usecase";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { TaskModel } from "../../../../domain/models/task.model";
import { TaskStore } from "../../../../infrastructure/store/task.store";

@Component({
  selector: "app-form-create-task",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    FloatLabelModule,
    ToastModule,
  ],
  templateUrl: "./form-create-task.component.html",
  styleUrl: "./form-create-task.component.scss",
  providers: [MessageService],
})
export class FormCreateTaskComponent {
  form = this.fb.group({
    title: ["", [Validators.required]],
    description: [""],
  });
  constructor(
    private fb: FormBuilder,
    private createTaskUseCase: CreateTaskUseCase,
    private messageService: MessageService,

    private store: TaskStore
  ) {}

  onSubmit() {
    const data = new TaskModel(
      "",
      this.form.value.title!,
      this.form.value.description!,
      false,
      new Date()
    );
    this.createTaskUseCase.exec(data).subscribe({
      next: (response) => {
        this.form.reset();
        this.store.add(response);
        this.messageService.add({
          severity: "success",
          summary: "Excelente",
          detail: "Tarea agregada exitosamente",
        });
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
}
