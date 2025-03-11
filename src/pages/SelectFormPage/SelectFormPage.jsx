import "../../App.css";
import React from 'react'
import SerieForm from "../../components/SerieForm/SerieForm";
import MovieForm from "../../components/MovieForm/MovieForm";

export default function SelectFormPage() {
    return (
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box m-auto">
        <legend className="fieldset-legend">Panel de administrador</legend>
  
        <div className='flex justify-around'>
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-outline btn-primary m-10" onClick={() => document.getElementById('movie-modal').showModal()}>Películas</button>
          
          <dialog id="movie-modal" className="modal">
            <div className="modal-box w-full max-w-3xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <MovieForm />
            </div>
          </dialog>
  
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-outline btn-primary m-10" onClick={() => document.getElementById('serie-modal').showModal()}>Series</button>
          
          <dialog id="serie-modal" className="modal">
            <div className="modal-box w-full max-w-3xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <SerieForm />
            </div>
          </dialog>
        </div>
      </fieldset>
    );
  }
