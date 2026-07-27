import axios from "axios";

const API = axios.create({
  baseURL: "/api",
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

const cleanUrls = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') {
    return obj.replace(/http:\/\/localhost:5000/g, "");
  }
  if (Array.isArray(obj)) {
    return obj.map(cleanUrls);
  }
  if (typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = cleanUrls(obj[key]);
    }
    return newObj;
  }
  return obj;
};

// ⚠️ RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (res) => {
    if (res.data) {
      res.data = cleanUrls(res.data);
    }
    return res;
  },
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