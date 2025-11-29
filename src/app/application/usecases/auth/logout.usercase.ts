import { inject, Injectable } from "@angular/core";
import { LoginDto } from "../../dto/auth/loginUser.dto";
import { TaskService } from "../../../infrastructure/http/services/task.service";
import { AuthService } from "../../../infrastructure/http/services/auth.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class LogoutUseCase {
  private authService: AuthService;
  private router = inject(Router);
  constructor() {
    this.authService = new AuthService();
  }
  exec() {
    this.authService.logout();
    this.router.navigate(["/auth"]);
  }
}
