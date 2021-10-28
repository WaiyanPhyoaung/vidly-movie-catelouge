import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/home/users">Users</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
