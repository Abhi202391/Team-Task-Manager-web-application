// project.routes.ts

import { Router } from "express";

import { ProjectController } from "./project.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

const projectController =
  new ProjectController();

//////////////////////////////////////////////////////
// PROTECTED ROUTES
//////////////////////////////////////////////////////

router.post(
  "/",
  authMiddleware,
  projectController.createProject
);

router.get(
  "/",
  authMiddleware,
  projectController.getAllProjects
);

router.get(
  "/:id",
  authMiddleware,
  projectController.getProjectById
);

router.put(
  "/:id",
  authMiddleware,
  projectController.updateProject
);

router.delete(
  "/:id",
  authMiddleware,
  projectController.deleteProject
);

//////////////////////////////////////////////////////
// MEMBERS
//////////////////////////////////////////////////////

router.post(
  "/:projectId/members",
  authMiddleware,
  projectController.addMember
);

router.delete(
  "/:projectId/members/:userId",
  authMiddleware,
  projectController.removeMember
);

export default router;