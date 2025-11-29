import { Injectable } from "@angular/core";
import { LoginDto } from "../../dto/auth/loginUser.dto";
import { TaskService } from "../../../infrastructure/http/services/task.service";
import { AuthService } from "../../../infrastructure/http/services/auth.service";

@Injectable({ providedIn: "root" })
export class LoginUserUseCase {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  exec(data: LoginDto) {
    return this.authService.login(data);
  }
}
