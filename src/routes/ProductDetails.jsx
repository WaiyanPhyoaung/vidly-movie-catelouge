import React from "react";
import queryString from "query-string";

function ProductDetails(props) {
  const { match, location, history } = props;
  // const queryObj = queryString.parse(location.search);

  const handleClick = () => {
    history.push("/products");
  };

  return (
    <div>
      <h3>ProductDetails Component</h3>
      <h5>Param : {match.params.id}</h5>
      <button onClick={handleClick} className="btn btn-info">
        Save
      </button>
    </div>
  );
}

export default ProductDetails;
