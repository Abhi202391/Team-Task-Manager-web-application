import express from "express";

import { ReportController } from "./reports.controller";

const router =
  express.Router();

const reportController =
  new ReportController();

//////////////////////////////////////////////////////
// EXPORT TASK REPORT
//////////////////////////////////////////////////////

router.get(
  "/export/tasks",
  (
    req,
    res
  ) =>
    reportController.exportTasks(
      req,
      res
    )
);

export default router;