// project.controller.ts

import { Request, Response } from "express";

import { ProjectService } from "./project.service";

const projectService = new ProjectService();

export class ProjectController {

  //////////////////////////////////////////////////////
  // CREATE PROJECT
  //////////////////////////////////////////////////////

  async createProject(
    req: Request,
    res: Response
  ) {

    try {

      const user = (req as any).user;

      const project =
        await projectService.createProject(
          req.body,
          user.id
        );

      return res.status(201).json({
        success: true,
        message:
          "Project created successfully",
        data: project,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // GET ALL PROJECTS
  //////////////////////////////////////////////////////

  async getAllProjects(
    req: Request,
    res: Response
  ) {

    try {

      const projects =
        await projectService.getAllProjects();

      return res.status(200).json({
        success: true,
        data: projects,
      });

    } catch (error: any) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // GET PROJECT BY ID
  //////////////////////////////////////////////////////

  async getProjectById(
    req: Request,
    res: Response
  ) {

    try {

      const project =
        await projectService.getProjectById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: project,
      });

    } catch (error: any) {

      return res.status(404).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // UPDATE PROJECT
  //////////////////////////////////////////////////////

  async updateProject(
    req: Request,
    res: Response
  ) {

    try {

      const project =
        await projectService.updateProject(
          req.params.id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Project updated successfully",
        data: project,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // DELETE PROJECT
  //////////////////////////////////////////////////////

  async deleteProject(
    req: Request,
    res: Response
  ) {

    try {

      await projectService.deleteProject(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Project deleted successfully",
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // ADD MEMBER
  //////////////////////////////////////////////////////

  async addMember(
    req: Request,
    res: Response
  ) {

    try {

      const member =
        await projectService.addMember(
          req.params.projectId,
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Member added successfully",
        data: member,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  //////////////////////////////////////////////////////
  // REMOVE MEMBER
  //////////////////////////////////////////////////////

  async removeMember(
    req: Request,
    res: Response
  ) {

    try {

      await projectService.removeMember(
        req.params.projectId,
        req.params.userId
      );

      return res.status(200).json({
        success: true,
        message:
          "Member removed successfully",
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }
}