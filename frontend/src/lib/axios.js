import axios from "axios";
const axiosinstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api",
    withCredentials: true
});

export default axiosinstance;
