import "../../App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieService from "../../services/movies.service";
import Loading from "../../components/Loading/Loading";

export default function LastMovies() {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    movieService
      .getAllMovies()
      .then((response) => {
        setMovies(response.data.slice(-4).reverse());
        setIsLoading(false);
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "An error occurred";
        setErrorMessage(errorDescription);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col p-10 m-auto">
      <h2 className="text-3xl mb-6 ml-12 text-center md:text-left">
        Últimas Películas
      </h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-auto">
            {movies.map((movie) => (
              <Link key={movie._id} to={`/movieDetails/${movie._id}`}>
                <div className="relative w-full min-w-0 h-96 shadow-xl overflow-hidden group">
                  <figure className="w-full h-full">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-3xl mb-2">{movie.title}</p>
                    <div className="badge badge-primary text-2xl w-auto h-auto"> {movie.year}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
