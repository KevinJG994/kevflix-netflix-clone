import "../../App.css";
import React from 'react'
import { Link } from 'react-router-dom'

export default function SelectFormPage() {
    return (

        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box m-auto">
            <legend className="fieldset-legend">Panel de administrador</legend>

            <div className='flex justify-around'>
                <Link to="/admin/createMovie" className="tooltip tooltip-right m-12 p-12" data-tip="Create Movie">
                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-outline btn-primary">
                        Peliculas
                    </button>
                </Link>

                <Link to="/admin/createSerie" className="tooltip tooltip-right m-12 p-12" data-tip="Create Serie">
                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-outline btn-primary">
                        Series
                    </button>
                </Link>
            </div>

        </fieldset>
    )
}
