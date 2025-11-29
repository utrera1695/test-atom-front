import { Injectable } from "@angular/core";
import { AuthService } from "../../../infrastructure/http/services/auth.service";
import { RegisterUserDto } from "../../dto/auth/registerUser.dto";

@Injectable({ providedIn: "root" })
export class RegisterUserUseCase {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  exec(data: RegisterUserDto) {
    return this.authService.register(data);
  }
}
