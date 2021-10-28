import http from "../../httpModule/httpService";
import config from "../../config.json";

const apiEndPoint = config.apiEndPoint;
export const getGenres = () => {
  return http.get(apiEndPoint + "/genres");
};
