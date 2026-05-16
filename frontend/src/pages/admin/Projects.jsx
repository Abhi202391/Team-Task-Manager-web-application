import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../../components/DashboardLayout"
import axiosInstance from "../../utils/axioInstance"
import toast from "react-hot-toast"
import { FiTrash2 } from "react-icons/fi"

const Projects = () => {
  const navigate = useNavigate()

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get("/projects")
      setProjects(response?.data?.data || [])
    } catch (error) {
      toast.error("Failed to load projects")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (projectId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this project?")
      if (!confirmDelete) return

      await axiosInstance.delete(`/projects/${projectId}`)
      toast.success("Project deleted successfully")

      setProjects((prev) => prev.filter((p) => p.id !== projectId))
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete project")
    }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700"
      case "COMPLETED":
        return "bg-blue-100 text-blue-700"
      case "ARCHIVED":
        return "bg-gray-200 text-gray-700"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <DashboardLayout activeMenu="Projects">
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
            <p className="text-gray-500">Manage all your workspace projects</p>
          </div>

          <button
            onClick={() => navigate("/admin/create-project")}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-sm"
          >
            + Create Project
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-10 text-gray-500">Loading projects...</div>
        )}

        {/* EMPTY STATE */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">No Projects Found</h3>
            <p className="text-gray-500 mt-1">Start by creating your first project</p>
          </div>
        )}

        {/* GRID */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((project) => (
              <div
                key={project.id}
                className="relative bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all"
              >

                {/* DELETE ICON */}
                <button
                  onClick={() => handleDelete(project.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                  title="Delete Project"
                >
                  <FiTrash2 size={18} />
                </button>

                {/* TITLE */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{project.name}</h2>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {project.description || "No description available"}
                  </p>
                </div>

                {/* STATUS */}
                <div className="mt-4">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* META */}
                <div className="text-xs text-gray-400 mt-3">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </div>

                {/* ACTIONS */}
                <div className="mt-6 flex flex-col gap-3">

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/projects/${project.id}`, {
                          state: { mode: "view", project },
                        })
                      }
                      className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/admin/projects/${project.id}`, {
                          state: { mode: "edit", project },
                        })
                      }
                      className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Edit
                    </button>
                  </div>

                  {/* ➕ CREATE TASK BUTTON (NEW) */}
                  <button
                    onClick={() =>
                      navigate("/admin/create-task", {
                        state: {
                          mode: "create",
                          projectId: project.id,
                        },
                      })
                    }
                    className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
                  >
                    + Create Task
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </DashboardLayout>
  )
}

export default Projects