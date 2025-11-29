import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { LoginUserUseCase } from "../../../../application/usecases/auth/loginuser.usecase";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { RegisterUserUseCase } from "../../../../application/usecases/auth/registeruser.usecase";

@Component({
  selector: "app-loginform",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: "./loginform.component.html",
  styleUrl: "./loginform.component.scss",
  providers: [ConfirmationService, MessageService],
})
export class LoginformComponent {
  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private loginUseCase: LoginUserUseCase,
    private registerUseCase: RegisterUserUseCase,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  onSubmit() {
    if (this.form.invalid) return;

    const email = this.form.value.email!;

    this.loginUseCase.exec({ email }).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.token);
        window.location.reload();
        // this.router.navigate(["/"]);
      },
      error: (err) => {
        console.log(err);
        if (err.status === 404) this.confirmCreate();
      },
    });
  }

  onConfirmCreate() {
    if (this.form.invalid) return;

    const email = this.form.value.email!;
    this.registerUseCase.exec({ email }).subscribe({
      next: (response) => {
        this.onSubmit();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "No se pudo crear el usuario",
        });
      },
    });
  }

  confirmCreate() {
    this.confirmationService.confirm({
      message: "No existe una cuenta con este correo, ¿te gustaría crear una?",
      header: "Crear nueva cuenta",
      icon: "pi pi-exclamation-triangle",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Si",
      rejectLabel: "No",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.onConfirmCreate();
      },
      reject: () => {},
    });
  }
}
