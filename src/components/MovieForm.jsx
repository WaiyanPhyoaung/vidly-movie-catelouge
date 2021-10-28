import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InputField from "../common/InputField";
import { propetyValidator } from "../reusable/propertyValidator";
import Joi from "joi";
import useForm from "../hooks/useForm";
import { formValidator } from "../reusable/formValidator";
import { getGenres } from "../Starter Code/services/genreService";
import { saveMovie } from "../Starter Code/services/movieService";

function MovieForm(props) {
  const mainSchema = {
    _id: Joi.string().label("Id"),
    title: Joi.string().min(3).max(30).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(1).label("Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    props.movie,
    mainSchema,
    propetyValidator,
    formValidator,
    login
  );
  const [genres, setGenres] = useState([]);
  const history = useHistory();

  async function fetchGenres() {
    const { data } = await getGenres();
    setGenres(data);
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  async function login() {
    console.log("no validation errors");
    await saveMovie(values);
    history.replace("/movies");
  }

  return (
    <div className="login-container">
      <h4 style={{ textAlign: "center" }} className="mb-4">
        {props.header || "New Movie"}
      </h4>
      <form className="login-form">
        <InputField
          name="title"
          label="Title"
          type="text"
          handleChange={handleChange}
          value={values.title || ""}
          error={errors.title}
        />

        <div className="mb-4">
          <label className="form-label">Genre</label>
          <select
            className="form-select"
            name="genreId"
            value={values.genreId || ""}
            onChange={handleChange}
          >
            <option value="">Select genre</option>
            {genres.map((gen) => (
              <option key={gen._id} value={gen._id}>
                {gen.name}
              </option>
            ))}
          </select>
          {errors && (
            <p className="text-danger mt-1 mb-2">
              <small>{errors.genreId}</small>
            </p>
          )}
        </div>

        <InputField
          name="numberInStock"
          label="Stock"
          type="number"
          handleChange={handleChange}
          value={values.numberInStock || ""}
          error={errors.numberInStock}
        />
        <InputField
          name="dailyRentalRate"
          label="Rate"
          type="number"
          handleChange={handleChange}
          value={values.dailyRentalRate || ""}
          error={errors.dailyRentalRate}
        />

        <button
          disabled={Object.keys(errors).length}
          style={{ float: "right" }}
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          {props.buttonText || "Add New"}
        </button>
      </form>
    </div>
  );
}

export default MovieForm;
