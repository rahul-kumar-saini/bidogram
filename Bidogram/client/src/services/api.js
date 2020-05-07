import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  //baseURL: "http://159.203.42.164:5000/"
});

export default instance;
