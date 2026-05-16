import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axioInstance"
import TaskStatusTabs from "../../components/TaskStatusTabs"
import { FaFileLines, FaEye, FaPen, FaTrash } from "react-icons/fa6"
import TaskCard from "../../components/TaskCard"
import toast from "react-hot-toast"

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([])
  const [tabs, setTabs] = useState([])
  const [filterStatus, setFilterStatus] = useState("All")
  const navigate = useNavigate()

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks")
      const tasks = response?.data?.data || []

      let filteredTasks = tasks
      if (filterStatus === "TODO") filteredTasks = tasks.filter(t => t.status === "TODO")
      else if (filterStatus === "IN_PROGRESS") filteredTasks = tasks.filter(t => t.status === "IN_PROGRESS")
      else if (filterStatus === "DONE") filteredTasks = tasks.filter(t => t.status === "DONE")

      setAllTasks(filteredTasks)

      setTabs([
        { label: "All", count: tasks.length },
        { label: "TODO", count: tasks.filter(t => t.status === "TODO").length },
        { label: "IN_PROGRESS", count: tasks.filter(t => t.status === "IN_PROGRESS").length },
        { label: "DONE", count: tasks.filter(t => t.status === "DONE").length },
      ])
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch tasks")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`)
      toast.success("Task deleted successfully")
      getAllTasks()
    } catch (error) {
      toast.error("Delete failed")
    }
  }

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get("/reports/export/tasks", { responseType: "blob" })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "tasks_details.xlsx")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      toast.error("Failed to download report")
    }
  }

  useEffect(() => {
    getAllTasks()
  }, [filterStatus])

  return (
    <DashboardLayout activeMenu={"Manage Task"}>
      <div className="my-6 px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Manage Tasks
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4">

            <TaskStatusTabs tabs={tabs} activeTab={filterStatus} setActiveTab={setFilterStatus} />

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3">

              {/* CREATE TASK */}
              <button
                onClick={() => navigate("/admin/create-task")}
                className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm cursor-pointer font-semibold"
              >
                + Create Task
              </button>

              {/* DOWNLOAD REPORT */}
              <button
                className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm cursor-pointer"
                onClick={handleDownloadReport}
              >
                <FaFileLines /> Download Report
              </button>

            </div>

          </div>

        </div>

        {/* TASKS */}
        {allTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {allTasks.map((item) => (

              <div key={item.id} className="relative">

                <TaskCard {...item} assignees={item.assignees || []} attachmentCount={item?.attachments?.length || 0} />

                {/* ACTION BUTTONS */}
                <div className="absolute top-3 right-3 flex gap-2">

                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg" onClick={() => navigate(`/admin/tasks/${item.id}`, { state: { mode: "view", task: item } })}>
                    <FaEye />
                  </button>

                  <button className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg" onClick={() => navigate(`/admin/tasks/${item.id}`, { state: { mode: "edit", task: item } })}>
                    <FaPen />
                  </button>

                  <button className="p-2 bg-red-100 hover:bg-red-200 rounded-lg" onClick={() => handleDelete(item.id)}>
                    <FaTrash />
                  </button>

                </div>

              </div>

            ))}

          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border">
            <h3 className="text-xl font-semibold text-gray-700">No Tasks Found</h3>
            <p className="text-gray-500 mt-2">Create a new task to get started</p>
          </div>
        )}

      </div>
    </DashboardLayout>
  )
}

export default ManageTasks