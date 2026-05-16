// user.repository.ts

import {
  PrismaClient,
  User,
} from "@prisma/client";

import {
  CreateUserDto,
  UpdateUserDto,
} from "./user.dto";

const prisma =
  new PrismaClient();

export class UserRepository {

  //////////////////////////////////////////////////////
  // CREATE USER
  //////////////////////////////////////////////////////

  async create(
    data: CreateUserDto
  ): Promise<User> {

    return prisma.user.create({
      data,
    });
  }

  //////////////////////////////////////////////////////
  // GET ALL USERS
  //////////////////////////////////////////////////////

  async findAll() {

    return prisma.user.findMany({

      include: {

        //////////////////////////////////////////////////////
        // CREATED PROJECTS
        //////////////////////////////////////////////////////

        createdProjects: true,

        //////////////////////////////////////////////////////
        // TASK ASSIGNMENTS
        //////////////////////////////////////////////////////

        taskAssignments: {

          include: {

            //////////////////////////////////////////////////////
            // TASK DETAILS
            //////////////////////////////////////////////////////

            task: {

              include: {

                project: true,

                createdBy: true,

                assignees: {
                  include: {
                    user: true,
                  },
                },

                attachments: true,
              },
            },
          },
        },

        //////////////////////////////////////////////////////
        // CREATED TASKS
        //////////////////////////////////////////////////////

        createdTasks: {

          include: {

            project: true,

            assignees: {
              include: {
                user: true,
              },
            },

            attachments: true,
          },
        },

        //////////////////////////////////////////////////////
        // PROJECT MEMBERS
        //////////////////////////////////////////////////////

        projectMembers: {

          include: {
            project: true,
          },
        },
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET USER BY ID
  //////////////////////////////////////////////////////

  async findById(id: string) {

    return prisma.user.findUnique({

      where: { id },

      include: {

        //////////////////////////////////////////////////////
        // CREATED PROJECTS
        //////////////////////////////////////////////////////

        createdProjects: true,

        //////////////////////////////////////////////////////
        // TASK ASSIGNMENTS
        //////////////////////////////////////////////////////

        taskAssignments: {

          include: {

            task: {

              include: {

                project: true,

                createdBy: true,

                assignees: {
                  include: {
                    user: true,
                  },
                },

                attachments: true,
              },
            },
          },
        },

        //////////////////////////////////////////////////////
        // CREATED TASKS
        //////////////////////////////////////////////////////

        createdTasks: {

          include: {

            project: true,

            assignees: {
              include: {
                user: true,
              },
            },

            attachments: true,
          },
        },

        //////////////////////////////////////////////////////
        // PROJECT MEMBERS
        //////////////////////////////////////////////////////

        projectMembers: {

          include: {
            project: true,
          },
        },
      },
    });
  }

  //////////////////////////////////////////////////////
  // GET USER BY EMAIL
  //////////////////////////////////////////////////////

  async findByEmail(
    email: string
  ): Promise<User | null> {

    return prisma.user.findUnique({

      where: { email },
    });
  }

  //////////////////////////////////////////////////////
  // UPDATE USER
  //////////////////////////////////////////////////////

  async update(
    id: string,
    data: UpdateUserDto
  ): Promise<User> {

    return prisma.user.update({

      where: { id },

      data,
    });
  }

  //////////////////////////////////////////////////////
  // DELETE USER
  //////////////////////////////////////////////////////

  async delete(
    id: string
  ): Promise<User> {

    return prisma.user.delete({

      where: { id },
    });
  }
}