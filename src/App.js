import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import MovieDetails from "./components/MovieDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import MovieForm from "./components/MovieForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/Logout";
import authService from "./Starter Code/services/authService";
import ProtectedRoute from "./common/ProtectedRoute";
// import MainApi from "./testAPI/MainApi";
// import MainRoute from "./components/routes/MainRoute";

export const CurrentUserContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser: currentUser }}>
      <Router>
        <ToastContainer />
        <Navbar />
        <div className="container mt-5">
          <Switch>
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/notfound" component={NotFound} />
            <ProtectedRoute path="/movies/new" Component={MovieForm} />
            <ProtectedRoute path="/movies/:id" Component={MovieDetails} />
            <Route path="/movies" render={(props) => <Movies {...props} />} />
            <Redirect from="/" to="/movies" />
            <Redirect to="/notfound" />
          </Switch>
        </div>
      </Router>
    </CurrentUserContext.Provider>
  );
}

export default App;
