import React, { useContext } from "react";
import Liked from "./Liked";
import _ from "lodash";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../App";

function TableBody(props) {
  const { pageMovies, handleLiked, handleDelete, column } = props;
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <tbody>
      {pageMovies.map((movie) => {
        return (
          <tr key={movie._id}>
            {column.map((c) => {
              if (c.type === "title")
                return (
                  <td key={c.title}>
                    <Link className="movie-link" to={`/movies/${movie._id}`}>
                      {_.get(movie, c.type)}
                    </Link>
                  </td>
                );
              else
                return (
                  <td key={c.title} className="col-3">
                    {_.get(movie, c.type)}
                  </td>
                ); //td for column.type...movie[column.type]
            })}

            <td>
              <Liked
                clickToggle={() => handleLiked(movie)}
                liked={movie.liked}
              />
            </td>
            <td>
              {currentUser && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(movie)}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
