// project.factory.ts

import { ProjectController } from "./project.controller";
import { ProjectRepository } from "./project.repository";
import { ProjectService } from "./project.service";

const projectRepository =
  new ProjectRepository();

const projectService =
  new ProjectService();

const projectController =
  new ProjectController();

export {
  projectRepository,
  projectService,
  projectController,
};