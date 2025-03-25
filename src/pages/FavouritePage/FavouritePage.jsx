import React, { useState, useEffect, useContext } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/users.service";

export default function FavouritePage() {
  const [movies, setMovies] = useState([]); // Estado para películas favoritas
  const [series, setSeries] = useState([]); // Estado para series favoritas
  const { user } = useContext(AuthContext); // Obtener el usuario desde el contexto

  // Cargar favoritos desde el backend
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!user?._id) {
          console.error("El user._id no está definido.");
          return;
        }

        // Llama al servicio para obtener las películas y series favoritas
        const moviesResponse = await userService.getFavouriteMovies(user._id);
        const seriesResponse = await userService.getFavouriteSeries(user._id);

        setMovies(moviesResponse.data); // Guardar películas favoritas
        setSeries(seriesResponse.data); // Guardar series favoritas
      } catch (error) {
        console.error("Error al cargar los favoritos:", error);
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen p-10 mt-20 m-auto calc-width-navbar">
      <h2 className="text-3xl mb-6 ml-12 text-center md:text-left">
        Mi contenido favorito
      </h2>

      <div className="calc-width">
        {/* Mostrar películas favoritas */}
        <h3 className="text-2xl mb-4 ml-12 text-center md:text-left">Películas Favoritas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Link to={`/movieDetails/${movie._id}`} key={movie._id}>
              <div className="relative w-full min-w-0 h-96 shadow-xl overflow-hidden group">
                <figure className="w-full h-full">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-3xl mb-2">{movie.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mostrar series favoritas */}
        <h3 className="text-2xl mt-8 mb-4 ml-12 text-center md:text-left">Series Favoritas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {series.map((serie) => (
            <Link to={`/serieDetails/${serie._id}`} key={serie._id}>
              <div className="relative w-full min-w-0 h-96 shadow-xl overflow-hidden group">
                <figure className="w-full h-full">
                  <img
                    src={serie.imageUrl}
                    alt={serie.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-3xl mb-2">{serie.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}