// project.types.ts

import { ProjectStatus } from "@prisma/client";

export interface ProjectResponse {
  id: string;
  name: string;
  description?: string | null;
  status: ProjectStatus;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}