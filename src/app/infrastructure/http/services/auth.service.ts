import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { enviroments } from "../../../../enviroments/enviroment";
import { LoginDto } from "../../../application/dto/auth/loginUser.dto";
import { RegisterUserDto } from "../../../application/dto/auth/registerUser.dto";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url: string = enviroments.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  register(data: RegisterUserDto): Observable<any> {
    return this.http.post(`${this.url}/auth/register`, data);
  }

  login(data: LoginDto): Observable<any> {
    return this.http.post(`${this.url}/auth/login`, data);
  }

  saveTokens(access: string) {
    localStorage.setItem("token", access);
  }

  logout() {
    localStorage.removeItem("token");
  }

  getAccessToken() {
    return localStorage.getItem("token");
  }
}
