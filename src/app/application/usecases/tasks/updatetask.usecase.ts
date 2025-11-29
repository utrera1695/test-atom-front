import { Injectable } from "@angular/core";
import { TaskService } from "../../../infrastructure/http/services/task.service";
import { UpdateTaskDto } from "../../dto/task/updateTask.dto";

@Injectable({ providedIn: "root" })
export class UpdateTasksUseCase {
  private taskService: TaskService;
  constructor() {
    this.taskService = new TaskService();
  }
  exec(taskId: string, data: UpdateTaskDto) {
    return this.taskService.update(taskId, data);
  }
}
