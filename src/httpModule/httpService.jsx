import axios from "axios";
import { toast } from "react-toastify";
import authService from "../Starter Code/services/authService";

/* add interceptors in request
axios.interceptors.request.use((config) => {
  config.headers.x-auth-token = authService.getJwtToken();
  return config;
}); */

//another way of doing it
axios.defaults.headers.common["x-auth-token"] = authService.getJwtToken();

axios.interceptors.response.use(null, (error) => {
  //client user input error
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.staus < 500;

  // server error
  if (expectedError) {
    console.log("Unexpected server error => ", error);
    toast.error("An expected error occured!");
  }

  return Promise.reject(error);
});
const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default http;
