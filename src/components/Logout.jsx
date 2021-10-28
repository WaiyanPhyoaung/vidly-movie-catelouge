import { useEffect } from "react";
import authService from "../Starter Code/services/authService";

function Logout() {
  useEffect(() => {
    authService.logout();
    window.location = "/movies";
  }, []);

  return null;
}

export default Logout;
