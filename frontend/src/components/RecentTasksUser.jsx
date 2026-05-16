import React from "react"
import moment from "moment"
import axiosInstance from "../utils/axioInstance"
import toast from "react-hot-toast"

const RecentTasksUser = ({ tasks }) => {

  //////////////////////////////////////////////////////
  // UPDATE STATUS ONLY
  //////////////////////////////////////////////////////
  const handleStatusChange = async (taskId, status) => {
    try {
      await axiosInstance.put(`/tasks/${taskId}`, {
        status,
      })

      toast.success("Status updated")
    } catch (error) {
      console.log(error)
      toast.error("Failed to update status")
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      {/* HEADER */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          My Tasks
        </h3>
      </div>

      {/* BODY */}
      <div className="p-6">

        {tasks?.length > 0 ? (
          <div className="space-y-4">

            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-lg p-4 gap-4"
              >

                {/* LEFT SIDE */}
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {task.title}
                  </h4>

                  <p className="text-sm text-gray-500">
                    Created:{" "}
                    {moment(task.createdAt).format("MMM Do YYYY")}
                  </p>

                  <p className="text-sm text-gray-500">
                    Due:{" "}
                    {task.dueDate
                      ? moment(task.dueDate).format("MMM Do YYYY")
                      : "N/A"}
                  </p>
                </div>

                {/* RIGHT SIDE - STATUS CONTROL */}
                <div className="flex items-center gap-3">

                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                    className="border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>

                </div>

              </div>
            ))}

          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            No tasks assigned
          </p>
        )}

      </div>
    </div>
  )
}

export default RecentTasksUser