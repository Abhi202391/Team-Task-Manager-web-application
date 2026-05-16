import { TaskPriority,TaskStatus,} from "@prisma/client";

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: Date;
  taskProgress?: number;
  projectId: string;
  assignedToIds?: string[];
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: Date;
  taskProgress?: number;
  assignedToIds?: string[];
}

// export interface CreateSingleTaskDto {
//   title: string;
//   description?: string;
//   priority?: TaskPriority;
//   status?: TaskStatus;
//   dueDate?: Date | null;
//   taskProgress?: number;
//   projectId: string;
//   assignedToId?: string;
// }

export interface AddTaskAttachmentDto {
  fileUrl: string;
  fileName?: string;
}