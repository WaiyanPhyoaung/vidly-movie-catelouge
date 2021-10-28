import React from "react";

function Liked(props) {
  let iconClass = "bi bi-heart";
  if (props.liked) iconClass += "-fill";
  return (
    <div>
      <i
        style={{ cursor: "pointer" }}
        onClick={props.clickToggle}
        className={iconClass}
      ></i>
    </div>
  );
}

export default Liked;
