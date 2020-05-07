import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888",
  //baseURL: "http://138.197.136.193:8888"
});

export default instance;
