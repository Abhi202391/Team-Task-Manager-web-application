import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import axiosInstance from "../../utils/axioInstance"
import { useSelector } from "react-redux"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const MyAssignedTasks = () => {
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])

  const getTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks")
      const allTasks = res?.data?.data || []

      const assignedTasks = allTasks.filter((task) =>
        task.assignees?.some((a) => a.userId === currentUser?.id)
      )

      setTasks(assignedTasks)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (currentUser?.id) getTasks()
  }, [currentUser])

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axiosInstance.put(`/tasks/${taskId}`, { status: newStatus })

      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, status: newStatus } : t
        )
      )

      toast.success("Status updated")
    } catch (err) {
      toast.error("Failed to update status")
      console.log(err)
    }
  }

  const getStatusStyle = (status) =>
    status === "DONE"
      ? "bg-green-100 text-green-700"
      : status === "IN_PROGRESS"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700"

  const getPriorityStyle = (priority) =>
    priority === "HIGH"
      ? "bg-red-100 text-red-700"
      : priority === "MEDIUM"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700"

  return (
    <DashboardLayout activeMenu={"My Tasks"}>
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Assigned Tasks</h1>
            <p className="text-gray-500">All tasks assigned to you</p>
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold transition"
          >
            ← Back
          </button>

        </div>

        {/* TASK LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tasks.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 bg-white p-10 rounded-xl shadow">
              No assigned tasks found
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => navigate(`/user/task-info/${task.id}`)}
                className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer p-5 border border-gray-100"
              >

                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {task.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {task.description || "No description"}
                </p>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className={`px-3 py-1 text-xs rounded-full ${getPriorityStyle(task.priority)}`}>
                    {task.priority}
                  </span>

                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(task.status)}`}>
                    {task.status}
                  </span>
                </div>

                <div className="mt-3">
                  <select
                    value={task.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <div className="text-xs text-gray-400 mt-3 flex justify-between">
                  <span>Created: {moment(task.createdAt).format("DD MMM YYYY")}</span>
                  <span>Due: {task.dueDate ? moment(task.dueDate).format("DD MMM YYYY") : "N/A"}</span>
                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </DashboardLayout>
  )
}

export default MyAssignedTasks