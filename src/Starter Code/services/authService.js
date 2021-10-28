import http from "../../httpModule/httpService";
import config from "../../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = config.apiEndPoint + "/auth";
const tokenKey = "token";

async function login(loginUser) {
  console.log("logging in");
  const response = await http.post(apiEndPoint, loginUser);
  localStorage.setItem(tokenKey, response.data);
}
function loginWhenRegister(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}
const getCurrentUser = () => {
  console.log("getCurrentUser");
  if (localStorage.getItem(tokenKey)) {
    const jwt = localStorage.getItem(tokenKey);

    return jwtDecode(jwt);
  } else return null;
};

const getJwtToken = () => {
  return localStorage.getItem(tokenKey);
};

const authService = {
  login,
  logout,
  getCurrentUser,
  loginWhenRegister,
  getJwtToken,
};
export default authService;
