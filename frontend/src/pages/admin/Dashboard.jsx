import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DashboardLayout from "../../components/DashboardLayout"
import axiosInstance from "../../utils/axioInstance"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import RecentTasks from "../../components/RecentTasks"
import CustomPieChart from "../../components/CustomPieChart"
import CustomBarChart from "../../components/CustomBarChart"

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
]
// ...existing imports remain same

const Dashboard = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [pieChartData, setPieChartData] = useState([])
  const [barChartData, setBarChartData] = useState([])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      const taskResponse = await axiosInstance.get("/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })

      const projectResponse = await axiosInstance.get("/projects", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })

      const fetchedTasks = taskResponse.data?.data || []
      const fetchedProjects = projectResponse.data?.data || []

      setTasks(fetchedTasks)
      setProjects(fetchedProjects)
      prepareChartData(fetchedTasks)

    } catch (error) {
      console.log("Dashboard Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const prepareChartData = (tasks) => {
    const pendingTasks = tasks.filter((task) => task.status === "TODO").length
    const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS").length
    const completedTasks = tasks.filter((task) => task.status === "DONE").length

    setPieChartData([
      { status: "Pending", count: pendingTasks },
      { status: "In Progress", count: inProgressTasks },
      { status: "Completed", count: completedTasks },
    ])

    const lowPriority = tasks.filter((task) => task.priority === "LOW").length
    const mediumPriority = tasks.filter((task) => task.priority === "MEDIUM").length
    const highPriority = tasks.filter((task) => task.priority === "HIGH").length

    setBarChartData([
      { priority: "Low", count: lowPriority },
      { priority: "Medium", count: mediumPriority },
      { priority: "High", count: highPriority },
    ])
  }

  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((task) => task.status === "TODO").length
  const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS").length
  const completedTasks = tasks.filter((task) => task.status === "DONE").length

  const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <DashboardLayout activeMenu={"Dashboard"}>

      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Welcome, {currentUser?.name}
              </h2>

              <p className="text-blue-100 mt-1">
                {moment().format("dddd Do MMMM YYYY")}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">

              <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md cursor-pointer"
                onClick={() => navigate("/admin/projects")}
              >
                View Projects
              </button>

              <button className="bg-white text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md cursor-pointer"
                onClick={() => navigate("/admin/create-project")}
              >
                + Create Project
              </button>

              {/* VIEW TASKS (NEW BUTTON) */}
              <button className="bg-green-500/30 backdrop-blur-md text-white border border-green-200/30 hover:bg-green-500/40 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md cursor-pointer"
                onClick={() => navigate("/admin/tasks")}
              >
                View Tasks
              </button>
              {/* CREATE TASK */}
              <button className="bg-black/20 backdrop-blur-md text-white border border-white/20 hover:bg-black/30 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md cursor-pointer"
                onClick={() => navigate("/admin/create-task")}
              >
                + Create Task
              </button>


            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-indigo-500">
            <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{projects.length}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{totalTasks}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{pendingTasks}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium">In Progress</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{inProgressTasks}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{completedTasks}</p>
          </div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Distribution</h3>
            <div className="h-64">
              <CustomPieChart data={pieChartData} label="Tasks" colors={COLORS} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Priority Levels</h3>
            <div className="h-64">
              <CustomBarChart data={barChartData} />
            </div>
          </div>

        </div>

        {/* RECENT TASKS */}
        <RecentTasks tasks={recentTasks} />

      </div>

    </DashboardLayout>
  )
}

export default Dashboard