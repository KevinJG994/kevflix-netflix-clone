import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import movieService from "../../services/movies.service";
import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "../../components/MovieForm/MovieForm";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/users.service";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { movieId } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    movieService
      .getMovieById(movieId)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "An error occurred";
        setErrorMessage(errorDescription);
      });
  }, [movieId]);

  // Verificar si la película está en favoritos cuando se cargan los favoritos
  useEffect(() => {
    // Obtener los favoritos del usuario y verificar si la película está en favoritos
    const fetchFavorites = async () => {
      try {
        if (!user?._id) {
          console.error("El user._id no está definido.");
          return;
        }

        const response = await userService.getFavouriteMovies(user._id);
        setFavorites(response.data);

        // Verificar si la película actual está en favoritos
        const found = response.data.some((fav) => fav._id === movie._id);
        setIsFavorite(found);
      } catch (error) {
        console.error("Error al obtener los favoritos:", error);
      }
    };

    fetchFavorites();
  }, [user, movie._id]);

  // Guardar favoritos
  const toggleFavorite = async () => {
    try {
      console.log("User ID:", user?._id); // Depuración: verifica si el user._id está definido

      if (!user?._id) {
        console.error("El user._id no está definido.");
        return;
      }

      if (isFavorite) {
        // Eliminar de favoritos
        await userService.deleteFavouriteMovie(user._id, movie._id);
        const updatedFavorites = favorites.filter((fav) => fav._id !== movie._id);
        setFavorites(updatedFavorites);

        console.log(`Eliminando película ${movie._id} de favoritos`);
      } else {
        // Agregar a favoritos
        await userService.addFavouriteMovie(user._id, movie._id);
        const updatedFavorites = [...favorites, movie];
        setFavorites(updatedFavorites);

        console.log(`Agregando película ${movie._id} a favoritos`);
      }

      // Cambiar el estado de favorito
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error al agregar/eliminar de favoritos:", error);
    }
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("¿De verdad quieres eliminar esta película?");
    if (isConfirmed) {
      movieService.deleteMovie(movieId).then(() => {
        navigate("/Home");
      });
    }
  };

  //Comprobar si el email es igual al del Admin
  const isAdmin = (user) => {
    return user && user.email === 'kjimenez@admin.com'
  }

  const ratingValue = movie.rating / 0.5;

  return (
    <div className="hero bg-base-100 min-h-screen flex flex-col items-center calc-width-navbar">
      <div className="hero-content flex flex-col items-center text-center lg:text-left lg:flex-row lg:m-auto sm:mt-20 calc-width">
        <div className="flex flex-col items-center lg:items-start">
          <img src={movie.imageUrl} className="max-w-sm rounded-lg shadow-2xl" />

          <div className="flex justify-center lg:justify-start mt-4">
            <button className="btn btn-primary mr-4 w-36" onClick={() => document.getElementById("video-modal").showModal()} title="Play">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            </button>

            <button
              className={`btn ${isFavorite ? "btn-primary" : "btn-outline btn-primary"} mx-2`}
              onClick={toggleFavorite}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>

            {isAdmin(user) && (
              <>
                <button className="btn btn-outline btn-primary mx-2" onClick={() => document.getElementById('movie-modal').showModal()} title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-primary-color">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>

                <dialog id="movie-modal" className="modal">
                  <div className="modal-box w-full max-w-3xl">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <MovieForm />
                  </div>
                </dialog>


                <button className="btn btn-outline btn-primary mx-2" title="Delete" onClick={handleDelete}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-primary-color">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </>
            )}

          </div>
        </div>
        <div className="lg:ml-10 mt-6 lg:mt-0 flex flex-col items-center lg:items-start">
          <h1 className="text-4xl font-bold text-primary-color">{movie.title}</h1>
          <p className="text-lg mt-2">Director: {movie.director}</p>

          <div className="flex flex-col items-center lg:flex-row lg:justify-around my-6 w-full space-y-2 lg:space-y-0">
            {/* Divide el rating por 0.5 para obtener el número de estrellas */}
            <div className="rating rating-lg rating-half w-28">
              {[...Array(10)].map((_, index) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-11"
                  className={`mask mask-star-2 ${index % 2 === 0 ? "mask-half-1" : "mask-half-2"}`}
                  aria-label={`${(index + 1) / 2} star`}
                  disabled
                  checked={ratingValue === index + 1}
                />
              ))}
            </div>

            <div className="hidden lg:block border-l-2 border-primary-color h-6"></div>
            <p className="text-lg">Duración: {movie.duration} min.</p>
            <div className="hidden lg:block border-l-2 border-primary-color h-6"></div>
            <p className="text-lg">{movie.producer}</p>
          </div>

          <p className="py-6 max-w-lg">
            {movie.synopsis}
          </p>

          <div className="flex flex-col items-center lg:flex-row lg:justify-around my-6 w-full space-y-2 lg:space-y-0">
            <div className="badge badge-primary text-xl w-auto h-auto">{movie.gender}</div>
            <div className="hidden lg:block border-l-2 border-primary-color h-6"></div>
            <p className="text-lg">Año: {movie.year}</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="video-modal" className="modal">
        <div className="modal-box w-[90%] max-w-2xl flex flex-col items-center">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-primary-color" title="Close">
              ✕
            </button>
          </form>
          <div className="flex justify-center items-center w-full">

            <iframe
              className="rounded-lg"
              width="640"
              height="360"
              src={movie.videoUrl}
              title={movie.videoUrl}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </dialog>
    </div>
  );
}