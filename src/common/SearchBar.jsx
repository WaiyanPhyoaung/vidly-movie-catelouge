import React from "react";

function SearchBar(props) {
  const { values, handleSearch } = props;
  return (
    <input
      style={{ width: "40%", float: "right" }}
      className="form-control my-2 "
      type="search"
      placeholder="Search"
      name="search"
      onChange={handleSearch}
      value={values}
    />
  );
}

export default SearchBar;
