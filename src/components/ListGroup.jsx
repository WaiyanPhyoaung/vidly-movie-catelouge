import React from "react";

function ListGroup(props) {
  const { genLists, currentGen, handleGenChange } = props;

  return (
    <ul className="list-group">
      {genLists.map((l) => (
        <li
          key={l._id}
          className={
            currentGen === l.name ? "list-group-item active" : "list-group-item"
          }
          style={{ cursor: "pointer" }}
          onClick={() => handleGenChange(l.name)}
        >
          {l.name}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
