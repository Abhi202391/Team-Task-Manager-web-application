import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DashboardLayout from "../../components/DashboardLayout"
import axiosInstance from "../../utils/axioInstance"
import moment from "moment"
import CustomPieChart from "../../components/CustomPieChart"
import CustomBarChart from "../../components/CustomBarChart"
import RecentTasksUser from "../../components/RecentTasksUser"
import { useNavigate } from "react-router-dom"

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"]

const UserDashboard = () => {
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])
  const [pieChartData, setPieChartData] = useState([])
  const [barChartData, setBarChartData] = useState([])

  const getTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks")
      const allTasks = response?.data?.data || []

      const userTasks = allTasks.filter((task) =>
        task.createdById === currentUser?.id ||
        task.assignees?.some((a) => a.userId === currentUser?.id)
      )

      setTasks(userTasks)
      prepareChartData(userTasks)
    } catch (error) {
      console.log("Error fetching tasks:", error)
    }
  }

  const prepareChartData = (data) => {
    if (!data) return

    const statusCount = { TODO: 0, IN_PROGRESS: 0, DONE: 0 }
    const priorityCount = { LOW: 0, MEDIUM: 0, HIGH: 0, URGENT: 0 }

    data.forEach((task) => {
      if (task.status) statusCount[task.status]++
      if (task.priority) priorityCount[task.priority]++
    })

    setPieChartData([
      { status: "TODO", count: statusCount.TODO },
      { status: "IN_PROGRESS", count: statusCount.IN_PROGRESS },
      { status: "DONE", count: statusCount.DONE },
    ])

    setBarChartData([
      { priority: "LOW", count: priorityCount.LOW },
      { priority: "MEDIUM", count: priorityCount.MEDIUM },
      { priority: "HIGH", count: priorityCount.HIGH },
      { priority: "URGENT", count: priorityCount.URGENT },
    ])
  }

  useEffect(() => {
    if (currentUser?.id) getTasks()
  }, [currentUser])

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome, {currentUser?.name}</h2>
            <p className="text-blue-100 mt-1">{moment().format("dddd Do MMM YYYY")}</p>
          </div>

          {/* VIEW TASKS BUTTON */}
          <button
            onClick={() => navigate("/user/my-assigned-tasks")}
            className="bg-white text-blue-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition shadow-md"
          >
            View Tasks
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>Total Tasks</h3>
            <p className="text-2xl font-bold">{tasks.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>TODO</h3>
            <p className="text-2xl font-bold">{tasks.filter(t => t.status === "TODO").length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>IN PROGRESS</h3>
            <p className="text-2xl font-bold">{tasks.filter(t => t.status === "IN_PROGRESS").length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3>DONE</h3>
            <p className="text-2xl font-bold">{tasks.filter(t => t.status === "DONE").length}</p>
          </div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl">
            <h3 className="font-semibold mb-4">Task Distribution</h3>
            <CustomPieChart data={pieChartData} colors={COLORS} />
          </div>

          <div className="bg-white p-6 rounded-xl">
            <h3 className="font-semibold mb-4">Priority Levels</h3>
            <CustomBarChart data={barChartData} />
          </div>

        </div>

        {/* RECENT TASKS */}
        <RecentTasksUser tasks={tasks.slice(0, 5)} />

      </div>
    </DashboardLayout>
  )
}

export default UserDashboard