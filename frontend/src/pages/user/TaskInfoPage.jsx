import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import axiosInstance from "../../utils/axioInstance"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"
import toast from "react-hot-toast"

const TaskInfoPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchTask = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get(`/tasks/${id}`)
      setTask(res?.data?.data || null)
    } catch (err) {
      toast.error("Failed to load task")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [id])

  const statusStyle = (status) =>
    status === "DONE"
      ? "bg-green-100 text-green-700"
      : status === "IN_PROGRESS"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700"

  const priorityStyle = (priority) =>
    priority === "HIGH"
      ? "bg-red-100 text-red-700"
      : priority === "MEDIUM"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700"

  return (
    <DashboardLayout activeMenu={"My Tasks"}>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Task Details</h1>
            <p className="text-blue-100 text-sm">
              Complete breakdown of task, project & assignment
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-md"
          >
            ← Back
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-500">
            Loading task details...
          </div>
        )}

        {/* CONTENT GRID */}
        {task && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ================= TASK INFO ================= */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition space-y-4">
              <h2 className="text-xl font-bold text-gray-800">📌 Task Info</h2>

              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-600 mt-1">{task.description || "No description provided"}</p>
              </div>

              <div className="flex gap-3 flex-wrap mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(task.status)}`}>
                  {task.status}
                </span>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityStyle(task.priority)}`}>
                  {task.priority}
                </span>
              </div>

              <div className="text-sm text-gray-500 border-t pt-3 flex justify-between">
                <span>Created: {moment(task.createdAt).format("DD MMM YYYY")}</span>
                <span>Due: {task.dueDate ? moment(task.dueDate).format("DD MMM YYYY") : "N/A"}</span>
              </div>
            </div>

            {/* ================= PROJECT INFO ================= */}
            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition space-y-3">
              <h2 className="text-lg font-bold text-gray-800">📁 Project</h2>

              <div className="p-4 bg-gray-50 rounded-xl border">
                <p className="font-semibold text-gray-800">
                  {task.project?.name || "No Project"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {task.project?.description || "No project description"}
                </p>
              </div>
            </div>

            {/* ================= ASSIGNED BY ================= */}
            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition space-y-3">
              <h2 className="text-lg font-bold text-gray-800">👤 Assigned By</h2>

              <div className="p-4 bg-gray-50 rounded-xl border space-y-1">
                <p className="font-semibold text-gray-800">
                  {task.createdBy?.name || "Unknown Admin"}
                </p>
                <p className="text-sm text-gray-600">
                  {task.createdBy?.email}
                </p>
                <p className="text-xs text-gray-500">
                  Created Date: 
                   <span>  </span>{moment(task.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
            </div>

            {/* ================= ASSIGNEES ================= */}
            <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-lg font-bold text-gray-800 mb-4">👥 Assigned Users</h2>

              <div className="flex flex-wrap gap-2">
                {task.assignees?.length ? (
                  task.assignees.map((a) => (
                    <span
                      key={a.id}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                    >
                      {a.user?.name}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No users assigned</p>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  )
}

export default TaskInfoPage