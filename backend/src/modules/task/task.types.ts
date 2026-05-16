// task.types.ts

import {
  TaskPriority,
  TaskStatus,
} from "@prisma/client";

export interface TaskResponse {
  id: string;
  title: string;
  description?: string | null;

  priority: TaskPriority;
  status: TaskStatus;

  dueDate?: Date | null;

  taskProgress: number;

  projectId: string;

  assignedToId?: string | null;

  createdById: string;

  createdAt: Date;
  updatedAt: Date;
}