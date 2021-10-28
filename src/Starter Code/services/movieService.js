import http from "../../httpModule/httpService";
import config from "../../config.json";

const apiEndPoint = config.apiEndPoint + "/movies";

function movieUrl(movieId) {
  return `${apiEndPoint}/${movieId}`;
}

export function getMovies() {
  return http.get(apiEndPoint);
}
export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}
export function saveMovie(movie) {
  if (movie._id) {
    const updateMovie = { ...movie };
    delete updateMovie._id;
    console.log(updateMovie);
    return http.put(movieUrl(movie._id), updateMovie);
  }
  return http.post(apiEndPoint, movie);
}
export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
