import { Request, Response } from "express";

import { ReportService } from "./report.service";

const reportService =
  new ReportService();

export class ReportController {

  //////////////////////////////////////////////////////
  // EXPORT TASK REPORT
  //////////////////////////////////////////////////////

  async exportTasks(
    req: Request,
    res: Response
  ) {

    try {

      const buffer =
        await reportService.exportTasks();

      //////////////////////////////////////////////////////
      // HEADERS
      //////////////////////////////////////////////////////

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=tasks_details.xlsx"
      );

      //////////////////////////////////////////////////////
      // SEND FILE
      //////////////////////////////////////////////////////

      res.send(buffer);

    } catch (error: any) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to export tasks report",
      });
    }
  }
}