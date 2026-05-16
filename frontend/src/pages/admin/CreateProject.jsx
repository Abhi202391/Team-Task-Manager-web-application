import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import axiosInstance from "../../utils/axioInstance"
import { useNavigate, useLocation } from "react-router-dom"
import toast from "react-hot-toast"

const CreateProject = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const mode = location.state?.mode
  const editData = location.state?.project
  const isViewMode = mode === "view"
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("ACTIVE")
  const [loading, setLoading] = useState(false)

  //////////////////////////////////////////////////////
  // PREFILL IF EDIT MODE
  //////////////////////////////////////////////////////
  useEffect(() => {
    if (editData) {
      setName(editData.name || "")
      setDescription(editData.description || "")
      setStatus(editData.status || "ACTIVE")
    }
  }, [editData])

  //////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Project name is required")
      return
    }

    try {
      setLoading(true)

      const payload = {
        name,
        description,
        status,
      }

      if (editData?.id) {
        await axiosInstance.put(`/projects/${editData.id}`, payload)
        toast.success("Project updated successfully")
      } else {
        await axiosInstance.post("/projects", payload)
        toast.success("Project created successfully")
      }

      navigate("/admin/projects")
    } catch (error) {
      console.log(error)
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout activeMenu={"Projects"}>
      <div className="p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {isViewMode
              ? "View Project"
              : editData
                ? "Edit Project"
                : "Create Project"}
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and organize your team projects efficiently
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 max-w-3xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Name
              </label>

              <input
                type="text"
                disabled={isViewMode}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                rows={5}
                disabled={isViewMode}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write project details..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Status
              </label>

              <select
                value={status}
                disabled={isViewMode}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>

            {/* BUTTONS */}
            {!isViewMode && (
              <div className="flex items-center gap-4 pt-2">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50"
                >
                  {loading
                    ? editData
                      ? "Updating..."
                      : "Creating..."
                    : editData
                      ? "Update Project"
                      : "Create Project"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/projects")}
                  className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>

              </div>
            )}
            {isViewMode && (
              <div className="pt-6 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate("/admin/projects")
                  }}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Back
                </button>
              </div>
            )}

          </form>

        </div>

      </div>
    </DashboardLayout>
  )
}

export default CreateProject