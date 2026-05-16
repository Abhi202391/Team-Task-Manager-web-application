import React, { useState } from "react"

import AuthLayout from "../../components/AuthLayout"

import {
  FaEyeSlash,
  FaPeopleGroup,
} from "react-icons/fa6"

import { FaEye } from "react-icons/fa"

import {
  Link,
  useNavigate,
} from "react-router-dom"

import { validateEmail } from "../../utils/helper"

import axiosInstance from "../../utils/axioInstance"

import {
  useDispatch,
  useSelector,
} from "react-redux"

import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/slice/userSlice"

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { loading } = useSelector((state) => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError("Please enter a valid email")
      return
    }
    if (!password) {
      setError(
        "Please enter password"
      )

      return
    }

    try {
      setError("")
      dispatch(signInStart())

      const response =
        await axiosInstance.post(
          "/auth/login",
          {
            email,
            password,
          }
        )
      const responseData =
        response.data.data
      localStorage.setItem(
        "token",
        responseData.token
      )

      localStorage.setItem("user",JSON.stringify(responseData.user))
      dispatch(
        signInSuccess(
          responseData.user
        )
      )
      if (
        responseData.user.role ===
        "ADMIN"
      ) {

        navigate(
          "/admin/dashboard",
          {
            replace: true,
          }
        )

      } else {

        navigate(
          "/user/dashboard",
          {
            replace: true,
          }
        )
      }

    } catch (error) {

      console.log(error)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {

        setError(
          error.response.data.message
        )

        dispatch(
          signInFailure(
            error.response.data.message
          )
        )

      } else {

        setError(
          "Something went wrong"
        )

        dispatch(
          signInFailure(
            "Something went wrong"
          )
        )
      }

    }
  }
  return (

    <AuthLayout>

      <div className="w-full max-w-md">

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">

          {/* TOP BAR */}

          <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>

          <div className="p-8">

            {/* HEADER */}

            <div className="text-center mb-8">

              <div className="flex justify-center">

                <div className="bg-blue-100 p-3 rounded-full">

                  <FaPeopleGroup className="text-4xl text-blue-600" />

                </div>

              </div>

              <h1 className="text-2xl font-bold text-gray-800 mt-4 uppercase">

                Project Flow

              </h1>

              <p className="text-gray-600 mt-1">

                Manage your projects efficiently

              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* EMAIL */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    mb-1
                  "
                >

                  Email Address

                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-lg
                    border
                    border-gray-300
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                  placeholder="your@email.com"
                />

              </div>

              {/* PASSWORD */}

              <div>

                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-gray-700
                    mb-1
                  "
                >

                  Password

                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-lg
                      border
                      border-gray-300
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      pr-12
                    "
                    placeholder="•••••••"
                  />

                  <button
                    type="button"
                    className="
                      absolute
                      inset-y-0
                      right-0
                      flex
                      items-center
                      pr-3
                      text-gray-500
                      hover:text-gray-700
                    "
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >

                    {showPassword
                      ? <FaEyeSlash />
                      : <FaEye />
                    }

                  </button>

                </div>

              </div>

              {/* ERROR */}

              {error && (

                <p className="text-red-500 text-sm">

                  {error}

                </p>

              )}

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  flex
                  justify-center
                  py-3
                  px-4
                  rounded-md
                  text-sm
                  font-medium
                  text-white
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  disabled:opacity-50
                  cursor-pointer
                "
              >

                {loading
                  ? "Logging in..."
                  : "LOGIN"
                }

              </button>

            </form>

            {/* SIGNUP */}

            <div className="mt-6 text-center text-sm">

              <p className="text-gray-600">

                Don't have an account?{" "}

                <Link
                  to="/signup"
                  className="
                    font-medium
                    text-blue-600
                    hover:text-blue-500
                  "
                >

                  Sign up

                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </AuthLayout>
  )
}

export default Login