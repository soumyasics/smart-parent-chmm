import axios from "axios";

// const  axiosMultipartInstance = axios.create({
//   baseURL: "http://hybrid.srishticampus.in/child_crescendo_api/",
// headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });
const  axiosMultipartInstance = axios.create({
  baseURL: "http://localhost:4044/child_crescendo_api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export default  axiosMultipartInstance