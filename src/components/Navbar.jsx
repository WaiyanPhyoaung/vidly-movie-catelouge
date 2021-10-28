import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CurrentUserContext } from "../App";

function Navbar() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Netflix
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/movies">
              movies
            </NavLink>

            <NavLink className="nav-item nav-link" to="/customers">
              customers
            </NavLink>

            <NavLink className="nav-item nav-link" to="/rentals">
              rentals
            </NavLink>
            {!currentUser && (
              <>
                <NavLink className="nav-item nav-link" to="/login">
                  login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  register
                </NavLink>
              </>
            )}
            {currentUser && (
              <>
                <NavLink className="nav-item nav-link" to="/logout">
                  logout
                </NavLink>
                <NavLink className="nav-item nav-link" to="/profile">
                  {currentUser.name}
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
