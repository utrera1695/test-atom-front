import { Injectable } from "@angular/core";
import { TaskService } from "../../../infrastructure/http/services/task.service";
import { CreateTaskDto } from "../../dto/task/createTask.dto";

@Injectable({ providedIn: "root" })
export class ListTasksUseCase {
  private taskService: TaskService;
  constructor() {
    this.taskService = new TaskService();
  }
  exec() {
    return this.taskService.getAll();
  }
}
