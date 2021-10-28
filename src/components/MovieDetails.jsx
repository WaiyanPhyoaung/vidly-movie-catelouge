import React, { useCallback, useEffect, useState } from "react";
import { getMovie } from "../Starter Code/services/movieService";
import MovieForm from "./MovieForm";

function MovieDetails(props) {
  const { history, match } = props;
  const [movie, setMovie] = useState({});

  const fetchMovieById = useCallback(async () => {
    try {
      const movieId = match.params.id;
      const { data: movieToUpdate } = await getMovie(movieId);
      setMovie(changeMovieRender(movieToUpdate));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        history.replace("/notfound");
      }
    }
  }, [history, match.params.id]);

  useEffect(() => {
    fetchMovieById();
  }, [fetchMovieById]);

  const changeMovieRender = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  return (
    <div>
      <MovieForm movie={movie} header="Update Movie" buttonText="Update" />
    </div>
  );
}

export default MovieDetails;
