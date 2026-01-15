import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://mern-bookstore-backend-o6qf.onrender.com/api",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  return req;
});

export default API;
