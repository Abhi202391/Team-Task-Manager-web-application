import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import axiosInstance from "../../utils/axioInstance"
import { useNavigate, useLocation } from "react-router-dom"
import toast from "react-hot-toast"

const CreateTask = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const editTask = location?.state?.task
  const passedProjectId = location?.state?.projectId
  const mode = location?.state?.mode || (editTask ? "edit" : "create")
  const isViewMode = mode === "view"
  const isEditMode = mode === "edit"
  const isReadOnly = isViewMode

  const [title, setTitle] = useState(editTask?.title || "")
  const [description, setDescription] = useState(editTask?.description || "")
  const [priority, setPriority] = useState(editTask?.priority || "MEDIUM")
  const [status, setStatus] = useState(editTask?.status || "TODO")
  const [dueDate, setDueDate] = useState(editTask?.dueDate ? editTask.dueDate.split("T")[0] : "")
  const [taskProgress, setTaskProgress] = useState(editTask?.taskProgress || 0)
  const [projectId, setProjectId] = useState(editTask?.projectId || passedProjectId || "")
  const [assignedToIds, setAssignedToIds] = useState(editTask?.assignees?.length > 0 ? editTask.assignees.map((a) => a.userId) : [""])
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)


  const handleAssignedUserChange = (index, value) => {
    const updated = [...assignedToIds]
    updated[index] = value
    setAssignedToIds(updated)
  }

  const addMemberField = () => setAssignedToIds([...assignedToIds, ""])

  const removeMemberField = (index) => setAssignedToIds(assignedToIds.filter((_, i) => i !== index))

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/projects", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      if (response.data.success) setProjects(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      if (response.data.success) setUsers(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!title.trim()) return toast.error("Task title is required")
      if (!projectId) return toast.error("Please select project")

      setLoading(true)

      const payload = {
        title,
        description,
        priority,
        status,
        dueDate,
        taskProgress: Number(taskProgress),
        projectId,
        assignedToIds: assignedToIds.filter((id) => id !== "")
      }

      const response = editTask
        ? await axiosInstance.put(`/tasks/${editTask.id}`, payload)
        : await axiosInstance.post("/tasks", payload)

      toast.success(editTask ? "Task updated successfully" : "Task created successfully")
      navigate("/admin/tasks")
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
    fetchUsers()
  }, [])

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className="p-6">

        {/* HEADER */}
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {isViewMode ? "View Task" : editTask ? "Update Task" : "Create Task"}
            </h1>
            <p className="text-gray-500 mt-1">Assign and manage project tasks efficiently</p>
          </div>

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold transition cursor-pointer"
          >
            ← Back
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 max-w-4xl">

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* TITLE */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Task Title</label>
              <input disabled={isReadOnly} value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" />
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea disabled={isReadOnly} rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" />
            </div>

            {/* PROJECT */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Project</label>
              <select disabled={isReadOnly} value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 disabled:bg-gray-100">
                <option value="">Choose Project</option>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            {/* USERS */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Assign Users</label>

              {assignedToIds.map((assignedUser, index) => (
                <div key={index} className="flex gap-3 items-center mb-3">

                  <select disabled={isReadOnly} value={assignedUser} onChange={(e) => handleAssignedUserChange(index, e.target.value)} className="flex-1 border border-gray-300 rounded-xl px-4 py-3 disabled:bg-gray-100">
                    <option value="">Select User</option>
                    {users.filter((u) => u.role === "MEMBER").map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>

                  {!isReadOnly && index === assignedToIds.length - 1 && (
                    <button type="button" onClick={addMemberField} className="bg-green-500 text-white w-12 h-12 rounded-xl flex items-center justify-center">+</button>
                  )}

                  {!isReadOnly && assignedToIds.length > 1 && (
                    <button type="button" onClick={() => removeMemberField(index)} className="bg-red-500 text-white w-12 h-12 rounded-xl flex items-center justify-center">×</button>
                  )}

                </div>
              ))}
            </div>

            {/* PRIORITY */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
              <select disabled={isReadOnly} value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 disabled:bg-gray-100">
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
              </select>
            </div>

            {/* STATUS */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select disabled={isReadOnly} value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 disabled:bg-gray-100">
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>

            {/* DUE DATE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
              <input disabled={isReadOnly} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 disabled:bg-gray-100" />
            </div>

            {/* PROGRESS */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Progress (%)</label>
              <input disabled={isReadOnly} type="number" value={taskProgress} onChange={(e) => setTaskProgress(Number(e.target.value))} className="w-full border border-gray-300 rounded-xl px-4 py-3 disabled:bg-gray-100" />
            </div>

            {/* BUTTONS */}
            {!isViewMode && (
              <div className="md:col-span-2 flex gap-4 pt-4">

                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50">
                  {loading ? (editTask ? "Updating..." : "Creating...") : editTask ? "Update Task" : "Create Task"}
                </button>

                <button type="button" onClick={() => navigate(-1)} className="border border-gray-300 px-6 py-3 rounded-xl font-semibold">
                  Cancel
                </button>

              </div>
            )}

          </form>

        </div>

      </div>
    </DashboardLayout>
  )
}

export default CreateTask