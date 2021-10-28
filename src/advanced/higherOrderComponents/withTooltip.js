import React, { useState } from "react";

export function withToolTip(Component) {
  return function WithTooltip(props) {
    const [showToolTip, setShowToolTip] = useState(false);
    return (
      <div
        onMouseOver={() => setShowToolTip(true)}
        onMouseOut={() => setShowToolTip(false)}
        style={{ background: "steelblue" }}
      >
        <Component {...props} showToolTip={showToolTip} />
      </div>
    );
  };
}
