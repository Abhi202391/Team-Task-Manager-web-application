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

import { validateEmail }
from "../../utils/helper"

import ProfilePhotoSelector
from "../../components/ProfilePhotoSelector"

import axiosInstance
from "../../utils/axioInstance"

import uploadImage
from "../../utils/uploadImage"

const SignUp = () => {

  const navigate = useNavigate()

  //////////////////////////////////////////////////////
  // STATES
  //////////////////////////////////////////////////////

  const [fullName, setFullName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [otp, setOtp] =
    useState("")

  const [otpSent, setOtpSent] =
    useState(false)

  const [otpVerified, setOtpVerified] =
    useState(false)

  const [showPassword, setShowPassword] =
    useState(false)

  const [error, setError] =
    useState("")

  const [success, setSuccess] =
    useState("")

  const [profilePic, setProfilePic] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  //////////////////////////////////////////////////////
  // SEND OTP
  //////////////////////////////////////////////////////

  const handleSendOtp = async () => {

    try {

      setError("")
      setSuccess("")

      if (!validateEmail(email)) {

        setError(
          "Please enter valid email"
        )

        return
      }

      setLoading(true)

      const response =
        await axiosInstance.post(
          "/auth/send-otp",
          {
            email,
          }
        )

      if (response.data?.success) {

        setOtpSent(true)

        setSuccess(
          "OTP sent successfully"
        )
      }

    } catch (error) {

      console.log(error)

      if (
        error.response?.data?.message
      ) {

        setError(
          error.response.data.message
        )

      } else {

        setError(
          "Failed to send OTP"
        )
      }

    } finally {

      setLoading(false)
    }
  }

  //////////////////////////////////////////////////////
  // VERIFY OTP
  //////////////////////////////////////////////////////

  const handleVerifyOtp = async () => {

    try {

      setError("")
      setSuccess("")

      if (!otp) {

        setError(
          "Please enter OTP"
        )

        return
      }

      setLoading(true)

      const response =
        await axiosInstance.post(
          "/auth/verify-otp",
          {
            email,
            otp,
          }
        )

      if (response.data?.success) {

        setOtpVerified(true)

        setSuccess(
          "OTP verified successfully"
        )
      }

    } catch (error) {

      console.log(error)

      if (
        error.response?.data?.message
      ) {

        setError(
          error.response.data.message
        )

      } else {

        setError(
          "OTP verification failed"
        )
      }

    } finally {

      setLoading(false)
    }
  }

  //////////////////////////////////////////////////////
  // HANDLE SIGNUP
  //////////////////////////////////////////////////////

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      //////////////////////////////////////////////////////
      // VALIDATION
      //////////////////////////////////////////////////////

      if (!fullName.trim()) {

        setError(
          "Please enter full name"
        )

        return
      }

      if (!validateEmail(email)) {

        setError(
          "Please enter valid email"
        )

        return
      }

      if (
        !password ||
        password.length < 6
      ) {

        setError(
          "Password must be at least 6 characters"
        )

        return
      }

      if (!otpVerified) {

        setError(
          "Please verify OTP first"
        )

        return
      }

      setLoading(true)
      setError("")
      setSuccess("")

      //////////////////////////////////////////////////////
      // UPLOAD IMAGE
      //////////////////////////////////////////////////////

      let profileImage = ""

      if (profilePic) {

        const imageUploadRes =
          await uploadImage(profilePic)

        profileImage =
          imageUploadRes?.imageUrl || ""
      }

      //////////////////////////////////////////////////////
      // REGISTER API
      //////////////////////////////////////////////////////

      const response =
        await axiosInstance.post(
          "/auth/register",
          {
            name: fullName,
            email,
            password,
            profileImage,
          }
        )

      //////////////////////////////////////////////////////
      // SUCCESS
      //////////////////////////////////////////////////////

      if (response.data?.success) {

        localStorage.setItem(
          "token",
          response.data.data.token
        )

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.data.user
          )
        )

        navigate("/dashboard")
      }

    } catch (error) {

      console.log(error)

      if (
        error.response?.data?.message
      ) {

        setError(
          error.response.data.message
        )

      } else {

        setError(
          "Something went wrong"
        )
      }

    } finally {

      setLoading(false)
    }
  }

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <AuthLayout>

      <div className="w-full max-w-md">

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">

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

                Join Project Flow

              </h1>

              <p className="text-gray-600 mt-1">

                Start managing your projects efficiently

              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <ProfilePhotoSelector
                image={profilePic}
                setImage={setProfilePic}
              />

              {/* FULL NAME */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">

                  Full Name

                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Full Name"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">

                  Email Address

                </label>

                <div className="flex gap-2">

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    disabled={otpVerified}
                  />

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={
                      loading ||
                      otpVerified
                    }
                    className="px-4 rounded-lg bg-blue-600 text-white text-sm whitespace-nowrap"
                  >

                    Send OTP

                  </button>

                </div>

              </div>

              {/* OTP */}

              {otpSent && !otpVerified && (

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">

                    Enter OTP

                  </label>

                  <div className="flex gap-2">

                    <input
                      type="text"
                      value={otp}
                      onChange={(e) =>
                        setOtp(
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter OTP"
                    />

                    <button
                      type="button"
                      onClick={
                        handleVerifyOtp
                      }
                      disabled={loading}
                      className="px-4 rounded-lg bg-green-600 text-white text-sm whitespace-nowrap"
                    >

                      Verify

                    </button>

                  </div>

                </div>

              )}

              {/* VERIFIED */}

              {otpVerified && (

                <p className="text-green-600 text-sm font-medium">

                  Email verified successfully ✅

                </p>

              )}

              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">

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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                    placeholder="•••••••"
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
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

              {/* SUCCESS */}

              {success && (

                <p className="text-green-600 text-sm">

                  {success}

                </p>

              )}

              {/* BUTTON */}

              <button
                type="submit"
                disabled={
                  loading ||
                  !otpVerified
                }
                className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer uppercase disabled:opacity-50"
              >

                {loading
                  ? "Creating Account..."
                  : "Sign Up"
                }

              </button>

            </form>

            {/* LOGIN */}

            <div className="mt-6 text-center text-sm">

              <p className="text-gray-600">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >

                  Login

                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </AuthLayout>
  )
}

export default SignUp