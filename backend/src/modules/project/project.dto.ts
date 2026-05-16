// project.dto.ts

import { ProjectStatus } from "@prisma/client";

export interface CreateProjectDto {
  name: string;
  description?: string;
  status?: ProjectStatus;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}

export interface AddProjectMemberDto {
  userId: string;
}