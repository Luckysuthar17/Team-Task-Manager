import axios from "axios";

const API = axios.create({
  baseURL: " https://team-task-manager-production-6fb6.up.railway.app ",
});

export default API;
