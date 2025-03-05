import React from "react";
import "../../App.css";
export default function MovieDetails() {
  return (
    <div className="hero bg-base-100 min-h-screen flex flex-col items-center calc-width-navbar">
    <div className="hero-content flex flex-col items-center text-center lg:text-left lg:flex-row lg:m-auto sm:mt-20 calc-width">
      <div className="flex flex-col items-center lg:items-start">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div className="flex justify-center lg:justify-start mt-4">
          <button
            className="btn btn-primary mr-4"
            onClick={() => document.getElementById("my_modal_3").showModal()}
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
        <h1 className="text-4xl font-bold text-primary-color">Spiderman Homecoming</h1>
        <p className="text-lg mt-2">Director: Jon Watts</p>
        <div className="flex flex-col items-center lg:flex-row lg:justify-around my-6 w-full space-y-2 lg:space-y-0">
          <p className="text-lg">Rating: 7.4</p>
          <div className="hidden lg:block border-l-2 border-primary-color h-6"></div>
          <p className="text-lg">Duration: 2h 13m</p>
          <div className="hidden lg:block border-l-2 border-primary-color h-6"></div>
          <p className="text-lg">Year: 2017</p>
        </div>
        <p className="py-6 max-w-lg">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
          a id nisi. Provident cupiditate voluptatem et in. Quaerat fugiat ut
          assumenda excepturi exercitationem quasi. In deleniti eaque aut
          repudiandae et a id nisi.
        </p>
      </div>
    </div>

    {/* Modal */}
    <dialog id="my_modal_3" className="modal">
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
            src="/images/video.mp4"
            title="Video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </dialog>
  </div>
);
}