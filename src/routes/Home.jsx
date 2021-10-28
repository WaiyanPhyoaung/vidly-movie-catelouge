import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import SideBar from "./SideBar";
import Users from "./Users";

function Home() {
  return (
    <section>
      <h3>Home Component</h3>
      <SideBar />

      <div>
        <Route path="/home/dashboard" component={Dashboard} />
        <Route path="/home/users" component={Users} />
      </div>
    </section>
  );
}

export default Home;
