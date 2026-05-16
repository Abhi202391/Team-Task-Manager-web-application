import React from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import MyAssignedTasks from "./pages/user/MyAssignedTasks"
import Dashboard from "./pages/admin/Dashboard"
import ManageTasks from "./pages/admin/ManageTasks"
import ManageUsers from "./pages/admin/ManageUsers"
import CreateTask from "./pages/admin/CreateTask"
import CreateProject from "./pages/admin/CreateProject"
import Projects from "./pages/admin/Projects"
import TaskInfoPage from "./pages/user/TaskInfoPage"
import UserDashboard from "./pages/user/UserDashboard"
import TaskDetails from "./pages/user/TaskDetails"
import MyTasks from "./pages/user/MyTasks"

import PrivateRoute from "./routes/PrivateRoute"
import ProtectedRoute from "./routes/ProtectedRoute"

import { Toaster } from "react-hot-toast"

/* SAFE JSON PARSE */
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"))
  } catch {
    return null
  }
}

const App = () => {
  const token = localStorage.getItem("token")
  const user = getUser()

  const isAdmin = user?.role === "ADMIN"
  const isMember = user?.role === "MEMBER"

  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <Routes>

          {/* ===================== PUBLIC ROUTES ===================== */}

          <Route
            path="/login"
            element={
              token ? (
                isAdmin ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Navigate to="/user/dashboard" replace />
                )
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/signup"
            element={
              token ? (
                isAdmin ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Navigate to="/user/dashboard" replace />
                )
              ) : (
                <SignUp />
              )
            }
          />

          {/* ===================== PROTECTED ===================== */}

          <Route element={<ProtectedRoute />}>

            {/* ================= ADMIN ROUTES ================= */}

            <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>

              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/tasks" element={<ManageTasks />} />
              <Route path="/admin/users" element={<ManageUsers />} />

              <Route path="/admin/create-task" element={<CreateTask />} />
              <Route path="/admin/tasks/:id" element={<CreateTask />} />

              <Route path="/admin/create-project" element={<CreateProject />} />
              <Route path="/admin/projects/:id" element={<CreateProject />} />

              <Route path="/admin/projects" element={<Projects />} />

            </Route>

            {/* ================= USER ROUTES ================= */}

            <Route element={<PrivateRoute allowedRoles={["MEMBER"]} />}>

              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/tasks" element={<MyTasks />} />
              <Route path="/user/task-details/:id" element={<TaskDetails />} />
              <Route path="/user/task-info/:id" element={<TaskInfoPage />} />
              <Route path="/user/my-assigned-tasks" element={<MyAssignedTasks />} />

            </Route>

          </Route>

          {/* ================= ROOT REDIRECT ================= */}

          <Route
            path="/"
            element={
              token ? (
                isAdmin ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Navigate to="/user/dashboard" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ================= FALLBACK ================= */}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  )
}

export default App