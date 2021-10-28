import http from "../../httpModule/httpService";
import config from "../../config.json";

const apiEndPoint = config.apiEndPoint + "/users";

export const reigster = (user) => {
  return http.post(apiEndPoint, {
    email: user.email,
    name: user.username,
    password: user.password,
  });
};
