import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../Starter Code/services/authService";

function ProtectedRoute({ path, Component, ...otherProps }) {
  return (
    <Route
      path={path}
      render={(props) => {
        if (!authService.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return <Component {...props} {...otherProps} />;
      }}
    />
  );
}

export default ProtectedRoute;
