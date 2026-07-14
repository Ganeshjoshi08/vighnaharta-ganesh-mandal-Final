import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true // 🔥 ADD THIS
});

// 🔐 REQUEST INTERCEPTOR
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ⚠️ RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Session expired 🔒");

      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");

      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default API;