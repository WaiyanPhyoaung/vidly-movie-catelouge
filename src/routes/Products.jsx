import React from "react";
import { Link } from "react-router-dom";

function Products() {
  const id1 = 1;
  const id2 = 2;

  return (
    <div>
      <h3>Products Component</h3>
      <ul>
        <li>
          <Link to={`/products/${id1}`}>product-1</Link>
        </li>
        <li>
          <Link to={`/products/${id2}`}>product-2</Link>
        </li>
      </ul>
    </div>
  );
}

export default Products;
