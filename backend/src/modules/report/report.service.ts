import ExcelJS from "exceljs";

import { PrismaClient }
from "@prisma/client";

const prisma =
  new PrismaClient();

export class ReportService {

  //////////////////////////////////////////////////////
  // EXPORT TASKS
  //////////////////////////////////////////////////////

  async exportTasks() {

    //////////////////////////////////////////////////////
    // GET TASKS
    //////////////////////////////////////////////////////

    const tasks =
      await prisma.task.findMany({

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
      });

    //////////////////////////////////////////////////////
    // WORKBOOK
    //////////////////////////////////////////////////////

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet(
        "Tasks"
      );

    //////////////////////////////////////////////////////
    // COLUMNS
    //////////////////////////////////////////////////////

    worksheet.columns = [

      {
        header: "Task Title",
        key: "title",
        width: 30,
      },

      {
        header: "Description",
        key: "description",
        width: 40,
      },

      {
        header: "Priority",
        key: "priority",
        width: 15,
      },

      {
        header: "Status",
        key: "status",
        width: 20,
      },

      {
        header: "Progress",
        key: "progress",
        width: 15,
      },

      {
        header: "Project",
        key: "project",
        width: 25,
      },

      {
        header: "Assigned Users",
        key: "assignedUsers",
        width: 40,
      },

      {
        header: "Created By",
        key: "createdBy",
        width: 25,
      },

      {
        header: "Due Date",
        key: "dueDate",
        width: 20,
      },

      {
        header: "Attachments",
        key: "attachments",
        width: 15,
      },
    ];

    //////////////////////////////////////////////////////
    // ADD ROWS
    //////////////////////////////////////////////////////

    tasks.forEach((task) => {

      worksheet.addRow({

        title: task.title,

        description:
          task.description || "-",

        priority:
          task.priority,

        status:
          task.status,

        progress:
          `${task.taskProgress}%`,

        project:
          task.project?.name || "-",

        assignedUsers:
          task.assignees
            ?.map(
              (a) =>
                a.user?.name
            )
            .join(", ") || "-",

        createdBy:
          task.createdBy?.name || "-",

        dueDate:
          task.dueDate
            ? new Date(
                task.dueDate
              ).toLocaleDateString()
            : "-",

        attachments:
          task.attachments
            ?.length || 0,
      });
    });

    //////////////////////////////////////////////////////
    // HEADER STYLE
    //////////////////////////////////////////////////////

    worksheet.getRow(1).font = {
      bold: true,
    };

    //////////////////////////////////////////////////////
    // RETURN BUFFER
    //////////////////////////////////////////////////////

    return workbook.xlsx.writeBuffer();
  }
}