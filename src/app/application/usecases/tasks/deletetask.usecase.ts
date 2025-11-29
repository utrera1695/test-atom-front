import { Injectable } from "@angular/core";
import { TaskService } from "../../../infrastructure/http/services/task.service";

@Injectable({ providedIn: "root" })
export class DeleteTasksUseCase {
  private taskService: TaskService;
  constructor() {
    this.taskService = new TaskService();
  }
  exec(taskId: string) {
    return this.taskService.delete(taskId);
  }
}
