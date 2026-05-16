import axios from "axios"

const BASE_URL =
  "http://localhost:5000/api/v1"

const axiosInstance = axios.create({
  baseURL: BASE_URL,

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

//////////////////////////////////////////////////////
// REQUEST INTERCEPTOR
//////////////////////////////////////////////////////

axiosInstance.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token")

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

//////////////////////////////////////////////////////
// RESPONSE INTERCEPTOR
//////////////////////////////////////////////////////

axiosInstance.interceptors.response.use(

  (response) => response,

  (error) => {

    //////////////////////////////////////////////////////
    // HANDLE UNAUTHORIZED
    //////////////////////////////////////////////////////

    if (error.response?.status === 401) {

      localStorage.removeItem("token")
      localStorage.removeItem("user")

      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default axiosInstance