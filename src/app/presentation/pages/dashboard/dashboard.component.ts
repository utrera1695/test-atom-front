import { Component } from "@angular/core";
import { FormCreateTaskComponent } from "../../components/dashboard/form-create-task/form-create-task.component";
import { ListTasksComponent } from "../../components/dashboard/list-tasks/list-tasks.component";
import { ButtonModule } from "primeng/button";
import { LogoutUseCase } from "../../../application/usecases/auth/logout.usercase";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [FormCreateTaskComponent, ListTasksComponent, ButtonModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  constructor(private logoutUseCase: LogoutUseCase) {}
  onSingOut() {
    this.logoutUseCase.exec();
  }
}
