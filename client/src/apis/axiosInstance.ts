import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://hybrid.srishticampus.in/child_crescendo_api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
const axiosInstance = axios.create({
  baseURL: "http://localhost:4044/child_crescendo_api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
