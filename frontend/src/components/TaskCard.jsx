import React from "react"
import Progress from "./Progress"
import moment from "moment"
import { FaFileLines } from "react-icons/fa6"

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignees,
  attachmentCount,
  onClick,
}) => {

  const getStatusTagColor = () => {
    switch (status) {
      case "TODO": return "bg-yellow-100 text-yellow-800"
      case "IN_PROGRESS": return "bg-blue-100 text-blue-800"
      case "DONE": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityTagColor = () => {
    switch (priority) {
      case "URGENT": return "bg-red-200 text-red-900"
      case "HIGH": return "bg-red-100 text-red-800"
      case "MEDIUM": return "bg-yellow-100 text-yellow-800"
      case "LOW": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formattedStatus =
    status === "IN_PROGRESS" ? "In Progress" : status === "DONE" ? "Completed" : "Pending"

  return (
    <div className="bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer hover:shadow-lg transition-all" onClick={onClick}>

      {/* TAGS */}
      <div className="flex items-end gap-3 px-4">

        <div className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-1 rounded-lg`}>
          {formattedStatus}
        </div>

        <div className={`text-[11px] font-medium ${getPriorityTagColor()} px-4 py-1 rounded-lg`}>
          {priority} Priority
        </div>

      </div>

      {/* CONTENT */}
      <div className={`px-4 border-l-[3px] mt-4 ${status === "IN_PROGRESS" ? "border-cyan-500" : status === "DONE" ? "border-indigo-500" : "border-violet-500"}`}>

        <p className="text-lg font-semibold text-gray-800 line-clamp-2">
          {title}
        </p>

        {/* DESCRIPTION (IMPROVED ELLIPSIS) */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-3 leading-[20px] break-words overflow-hidden text-ellipsis">
          {description || "No description provided"}
        </p>

        <div className="mt-4">
          <Progress progress={progress || 0} status={formattedStatus} />
        </div>

      </div>

      {/* FOOTER */}
      <div className="px-4 mt-5">

        <div className="flex items-center justify-between my-1">

          <div>
            <label className="text-xs text-gray-500">Created</label>
            <p className="text-[13px] font-medium text-gray-900">
              {moment(createdAt).format("Do MMM YYYY")}
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-500">Due Date</label>
            <p className="text-[13px] font-medium text-gray-900">
              {dueDate ? moment(dueDate).format("Do MMM YYYY") : "No Due Date"}
            </p>
          </div>

        </div>

        <div className="flex items-center justify-between mt-4">

          {attachmentCount > 0 && (
            <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg">
              <FaFileLines className="text-blue-600" />
              <span className="text-xs font-medium text-gray-900">
                {attachmentCount}
              </span>
            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default TaskCard