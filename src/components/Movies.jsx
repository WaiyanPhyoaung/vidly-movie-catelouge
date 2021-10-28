import React, { useContext, useEffect, useRef, useState } from "react";
import { deleteMovie, getMovies } from "../Starter Code/services/movieService";
import { getGenres } from "../Starter Code/services/genreService";
import Pagination from "../common/Pagination";
import ListGroup from "./ListGroup";
import ShowMovies from "./ShowMovies";
import _ from "lodash";
import SearchBar from "../common/SearchBar";
import { toast } from "react-toastify";
import { CurrentUserContext } from "../App";

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const pageSize = useRef(4);
  const [updateMovies, setUpdateMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGen, setCurrentGen] = useState("All Genres");
  const [genre, setGenre] = useState([]);
  const [sortColumn, setSortedColumn] = useState({
    type: "title",
    order: "asc",
  });

  const { currentUser } = useContext(CurrentUserContext);

  async function fetchGenre() {
    const { data } = await getGenres();
    setGenre([{ _id: "23abakke32123sfd", name: "All Genres" }, ...data]);
  }
  async function fetchMovies() {
    const { data } = await getMovies();
    setMovies(data);
  }

  useEffect(() => {
    fetchMovies();
    fetchGenre();
  }, []);

  useEffect(() => {
    if (currentGen !== "All Genres") {
      const updatedMovies = movies.filter((m) => m.genre.name === currentGen);
      setUpdateMovies(updatedMovies);
    } else {
      setUpdateMovies([...movies]);
    }
  }, [currentGen, movies]);

  const getMoviesData = () => {
    const countArr = [
      (currentPage - 1) * pageSize.current,
      currentPage * pageSize.current,
    ];

    const sortedMovies = _.orderBy(
      updateMovies,
      [sortColumn.type],
      [sortColumn.order]
    );
    const moviesByPage = sortedMovies.slice(countArr[0], countArr[1]);
    return moviesByPage;
  };

  const handleDelete = async (movie) => {
    const originalMovies = [...movies];
    const newMovies = movies.filter((mov) => mov._id !== movie._id);
    setMovies(newMovies);
    try {
      const deletedMovie = await deleteMovie(movie._id);
      console.log("delete", deletedMovie);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        toast.error("This movie has already been deleted!");
        setMovies(originalMovies);
      }
    }
  };
  const handleLiked = (movie) => {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index].liked = !newMovies[index].liked;
    setMovies(newMovies);
  };
  const handleSort = (sortColumn) => {
    setSortedColumn(sortColumn);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleGenChange = (name) => {
    setCurrentPage(1);
    setCurrentGen(name);
  };
  const handleAdd = () => {
    props.history.push("/movies/new");
  };
  const handleSearch = (event) => {
    const searchString = event.target.value;

    if (searchString) {
      const filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().includes(searchString.toLowerCase())
      );
      setUpdateMovies(filteredMovies);
    } else setUpdateMovies(movies);
  };

  if (movies.length < 1) return <h4>No movies in the database</h4>;

  const moviesByPage = getMoviesData();

  return (
    <div className="row gx-5">
      <div className="col-3">
        <ListGroup
          genLists={genre}
          currentGen={currentGen}
          handleGenChange={handleGenChange}
        />
      </div>
      <article className="col">
        {currentUser && (
          <button className="btn btn-primary mb-4" onClick={handleAdd}>
            New Movie
          </button>
        )}
        <h4>Showing {updateMovies.length} movies in the database.</h4>
        <SearchBar value="" handleSearch={handleSearch} />
        <ShowMovies
          pageMovies={moviesByPage}
          sortColumn={sortColumn}
          handleLiked={handleLiked}
          handleDelete={handleDelete}
          handleSort={handleSort}
        />
        <Pagination
          totalItems={updateMovies.length}
          pageSize={pageSize.current}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </article>
    </div>
  );
}

export default Movies;
