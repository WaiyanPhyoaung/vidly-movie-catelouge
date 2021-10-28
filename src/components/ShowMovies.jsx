import React, { useState } from "react";
import PropTypes from "prop-types";
import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";

function ShowMovies(props) {
  const [column] = useState([
    { type: "title", title: "Title" },
    { type: "genre.name", title: "Genre" },
    { type: "numberInStock", title: "Stock" },
    { type: "dailyRentalRate", title: "Rate" },
  ]);

  const { pageMovies, handleLiked, handleDelete, handleSort, sortColumn } =
    props;

  return (
    <table className="table">
      <TableHeader
        column={column}
        sortColumn={sortColumn}
        handleSort={handleSort}
      />
      <TableBody
        pageMovies={pageMovies}
        handleDelete={handleDelete}
        handleLiked={handleLiked}
        column={column}
      />
    </table>
  );
}
ShowMovies.propTypes = {
  pageMovies: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLiked: PropTypes.func.isRequired,
};

export default ShowMovies;
