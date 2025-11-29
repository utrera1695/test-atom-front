import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { enviroments } from "../../../../enviroments/enviroment";
import { CreateTaskDto } from "../../../application/dto/task/createTask.dto";
import { UpdateTaskDto } from "../../../application/dto/task/updateTask.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private url: string = enviroments.apiUrl;
  private http: HttpClient = inject(HttpClient);
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
  constructor() {}

  create(data: CreateTaskDto): Observable<any> {
    return this.http.post(`${this.url}/task`, data, { headers: this.headers });
  }
  update(id: string, data: UpdateTaskDto): Observable<any> {
    return this.http.put(`${this.url}/task/${id}`, data, {
      headers: this.headers,
    });
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/task/${id}`, {
      headers: this.headers,
    });
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.url}/tasks`, { headers: this.headers });
  }
}
