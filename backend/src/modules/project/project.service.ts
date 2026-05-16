// project.service.ts

import {
  AddProjectMemberDto,
  CreateProjectDto,
  UpdateProjectDto,
} from "./project.dto";

import { ProjectRepository } from "./project.repository";

export class ProjectService {

  private projectRepository =
    new ProjectRepository();

  //////////////////////////////////////////////////////
  // CREATE PROJECT
  //////////////////////////////////////////////////////

  async createProject(
    data: CreateProjectDto,
    createdById: string
  ) {

    return this.projectRepository.create(
      data,
      createdById
    );
  }

  //////////////////////////////////////////////////////
  // GET ALL PROJECTS
  //////////////////////////////////////////////////////

  async getAllProjects() {

    return this.projectRepository.findAll();
  }

  //////////////////////////////////////////////////////
  // GET PROJECT BY ID
  //////////////////////////////////////////////////////

  async getProjectById(id: string) {

    const project =
      await this.projectRepository.findById(id);

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }

  //////////////////////////////////////////////////////
  // UPDATE PROJECT
  //////////////////////////////////////////////////////

  async updateProject(
    id: string,
    data: UpdateProjectDto
  ) {

    await this.getProjectById(id);

    return this.projectRepository.update(id, data);
  }

  //////////////////////////////////////////////////////
  // DELETE PROJECT
  //////////////////////////////////////////////////////

  async deleteProject(id: string) {

    await this.getProjectById(id);

    return this.projectRepository.delete(id);
  }

  //////////////////////////////////////////////////////
  // ADD MEMBER
  //////////////////////////////////////////////////////

  async addMember(
    projectId: string,
    data: AddProjectMemberDto
  ) {

    await this.getProjectById(projectId);

    const existingMember =
      await this.projectRepository.findMember(
        projectId,
        data.userId
      );

    if (existingMember) {
      throw new Error(
        "User already exists in project"
      );
    }

    return this.projectRepository.addMember(
      projectId,
      data.userId
    );
  }

  //////////////////////////////////////////////////////
  // REMOVE MEMBER
  //////////////////////////////////////////////////////

  async removeMember(
    projectId: string,
    userId: string
  ) {

    const member =
      await this.projectRepository.findMember(
        projectId,
        userId
      );

    if (!member) {
      throw new Error("Member not found");
    }

    return this.projectRepository.removeMember(
      projectId,
      userId
    );
  }
}