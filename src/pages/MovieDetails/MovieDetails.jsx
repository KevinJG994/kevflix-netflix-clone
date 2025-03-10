import React, { useEffect, useState } from "react";
import "../../App.css";
import movieService from "../../services/movies.service";
import { useParams } from "react-router-dom";

export default function MovieDetails() {

  const [movie, setMovie] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const {movieId} = useParams()

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

  return (
    <div className="hero bg-base-100 min-h-screen flex flex-col items-center calc-width-navbar">
      <div className="hero-content flex flex-col items-center text-center lg:text-left lg:flex-row lg:m-auto sm:mt-20 calc-width">
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={movie.image}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="flex justify-center lg:justify-start mt-4">
            <button
              className="btn btn-primary mr-4"
              onClick={() => document.getElementById("video-modal").showModal()}
              title="Play"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
            </button>
            <button className="btn btn-outline btn-primary" title="Favourite">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="lg:ml-10 mt-6 lg:mt-0 flex flex-col items-center lg:items-start">
          <h1 className="text-4xl font-bold text-primary-color">{movie.title}</h1>
          <p className="text-lg mt-2">Director: {movie.director}</p>
          <div className="flex flex-col items-center lg:flex-row lg:justify-around my-6 w-full space-y-2 lg:space-y-0">

            <div className="rating rating-lg rating-half w-28">
              <input type="radio" name="rating-11" className="rating-hidden" disabled />
              <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1" aria-label="0.5 star" disabled />
              <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2" aria-label="1 star" disabled />
              <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1" aria-label="1.5 star" disabled />
              <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2" aria-label="2 star" disabled />
              <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1" aria-label="2.5 star" defaultChecked disabled />
              <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2" aria-label="3 star" disabled />
              <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1" aria-label="3.5 star" disabled />
              <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2" aria-label="4 star" disabled />
              <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1" aria-label="4.5 star" disabled />
              <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2" aria-label="5 star" disabled />
            </div>

            <div className="hidden lg:block border-l-2 border-primary-color h-6"></div>
            <p className="text-lg">Duración: {movie.duration} min.</p>
            <div className="hidden lg:block border-l-2 border-primary-color h-6"></div>
            <p className="text-lg">Productora: {movie.year}</p>
          </div>
          <p className="py-6 max-w-lg">
            {movie.synopsis}
          </p>
          <div className="flex flex-col items-center lg:flex-row lg:justify-around my-6 w-full space-y-2 lg:space-y-0">
                    <p className="text-lg">Género: {movie.gender}</p>
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
            <video className="rounded-lg" width="640" height="360" controls>
              <source src="/images/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </dialog>
    </div>
  );
}