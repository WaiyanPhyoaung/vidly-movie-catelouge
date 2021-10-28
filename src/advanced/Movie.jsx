import React from "react";
import { withToolTip } from "./higherOrderComponents/withTooltip";

function Movie(props) {
  return <div>Movie {props.showToolTip && <h2>Showing ToolTip</h2>} </div>;
}

export default withToolTip(Movie);
