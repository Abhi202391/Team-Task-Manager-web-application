import React, { useEffect, useState } from "react"
import {
  MdClose,
  MdMenu,
  MdAdminPanelSettings,
  MdOutlineDashboard,
} from "react-icons/md"

import {
  FaUserCircle,
  FaTasks,
} from "react-icons/fa"
import {
  Link,
  useNavigate,
} from "react-router-dom"
import SideMenu from "./SideMenu"
import { MdLogout } from "react-icons/md"
import axiosInstance from "../utils/axioInstance"

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] =
    useState(false)

  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const storedUser =localStorage.getItem("user")
    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      )
    }
  }, [])

  const role = user?.role || "MEMBER"
  const handleGoHome = () => {
  if (role === "ADMIN") {
    navigate("/admin/dashboard")
  } else {
    navigate("/user/dashboard")
  }
}
 const handleLogout = () => {
  localStorage.clear()
  navigate("/login", { replace: true })
  window.location.reload()
}
  return (

    <div
      className="
        bg-white/90
        backdrop-blur-md
        border-b
        border-gray-200
        sticky
        top-0
        z-50
        px-4
        py-3
        flex
        items-center
        justify-between
        shadow-sm
      "
    >

      {/* LEFT */}

      <div
  className="flex items-center gap-3 cursor-pointer"
  onClick={handleGoHome}
>

        {/* MOBILE MENU */}

        <button
          className="
            p-2
            rounded-lg
            text-gray-700
            hover:bg-gray-100
            transition
            lg:hidden
          "
          onClick={() =>
            setOpenSideMenu(
              !openSideMenu
            )
          }
        >

          {openSideMenu ? (

            <MdClose className="text-2xl" />

          ) : (

            <MdMenu className="text-2xl" />

          )}

        </button>

        {/* LOGO */}

        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-blue-600
            flex
            items-center
            justify-center
            shadow-md
          "
        >

          <FaTasks className="text-white text-lg" />

        </div>

        {/* TITLE */}

        <div>

          <h2
            className="
              text-lg
              md:text-xl
              font-bold
              text-gray-800
            "
          >

            Project Flow

          </h2>

          <p
            className="
              text-xs
              text-gray-500
              hidden
              md:block
            "
          >

            Team Project Management

          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        {/* ROLE BADGE */}

        <div
          className={`
            hidden md:flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
            ${role === "ADMIN"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
            }
          `}
        >

          {role === "ADMIN" ? (

            <MdAdminPanelSettings className="text-lg" />

          ) : (

            <MdOutlineDashboard className="text-lg" />

          )}

          {role}

        </div>

        {/* USER INFO */}

        <div
          className="
            flex
            items-center
            gap-3
            bg-gray-50
            px-3
            py-2
            rounded-xl
            border
            border-gray-200
          "
        >
          {/* LOGOUT BUTTON */}

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-3
              py-2.5
              rounded-xl
              bg-red-50
              hover:bg-red-100
              text-red-600
              border
              border-red-200
              transition
              cursor-pointer
            "
          >

            <MdLogout className="text-xl" />

            <span className="hidden md:block text-sm font-medium">

              Logout

            </span>

          </button>

          {/* PROFILE */}

          {user?.profileImage ? (

            <img
              src={user.profileImage}
              alt="profile"
              className="
                w-10
                h-10
                rounded-full
                object-cover
                border-2
                border-blue-500
              "
            />

          ) : (

            <FaUserCircle
              className="
                text-4xl
                text-gray-500
              "
            />

          )}

          {/* NAME */}

          <div className="hidden sm:block">

            <p
              className="
                text-sm
                font-semibold
                text-gray-800
              "
            >

              {user?.name || "User"}

            </p>

            <p
              className="
                text-xs
                text-gray-500
              "
            >

              {user?.email || ""}

            </p>

          </div>

        </div>

      </div>

      {/* MOBILE SIDEMENU */}

      {openSideMenu && (

        <div
          className="
            fixed
            inset-0
            z-40
            flex
            lg:hidden
          "
        >

          {/* BACKDROP */}

          <div
            className="
              fixed
              inset-0
              bg-black/40
              backdrop-blur-sm
            "
            onClick={() =>
              setOpenSideMenu(false)
            }
          />

          {/* SIDEBAR */}

          <div
            className="
              relative
              z-50
              w-72
              h-full
              bg-white
              shadow-2xl
              animate-slideInLeft
            "
          >

            {/* CLOSE */}

            <button
              className="
                absolute
                top-4
                right-4
                p-2
                rounded-lg
                hover:bg-gray-100
                transition
              "
              onClick={() =>
                setOpenSideMenu(false)
              }
            >

              <MdClose className="text-2xl" />

            </button>

            {/* USER SECTION */}

            <div
              className="
                p-6
                border-b
                border-gray-200
                flex
                items-center
                gap-3
              "
            >

              {user?.profileImage ? (

                <img
                  src={user.profileImage}
                  alt="profile"
                  className="
                    w-14
                    h-14
                    rounded-full
                    object-cover
                    border-2
                    border-blue-500
                  "
                />

              ) : (

                <FaUserCircle
                  className="
                    text-5xl
                    text-gray-500
                  "
                />

              )}

              <div>

                <h3
                  className="
                    font-semibold
                    text-gray-800
                  "
                >

                  {user?.name || "User"}

                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >

                  {role}

                </p>

              </div>

            </div>

            {/* MENU */}

            {/* MENU */}

            <div className="pt-4">

              <SideMenu
                activeMenu={activeMenu}
              />

              {/* LOGOUT */}

              <div className="px-4 mt-6">

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-4
                    py-3
                    rounded-xl
                    bg-red-50
                    hover:bg-red-100
                    text-red-600
                    border
                    border-red-200
                    transition
                    cursor-pointer
                  "
                >

                  <MdLogout className="text-xl" />

                  Logout

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Navbar