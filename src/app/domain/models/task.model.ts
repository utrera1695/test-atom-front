export class TaskModel {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  constructor(
    id: string,
    title: string,
    description: string,
    completed: boolean,
    createdAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt || new Date();
    this.completed = completed;
  }
}
