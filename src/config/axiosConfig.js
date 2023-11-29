
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_EXPRESS,
  withCredentials: true, 
});

export default axiosInstance;
