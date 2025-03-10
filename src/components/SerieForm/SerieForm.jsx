import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import serieService from '../../services/series.service'

export default function SerieForm() {
    const [title, setTitle] = useState('')
    const [director, setDirector] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [gender, setGender] = useState('')
    const [rating, setRating] = useState('')
    const [episodes, setEpisodes] = useState('')
    const [seasons, setSeasons] = useState('')
    const [year, setYear] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate()
    const { serieId } = useParams()
    const isEditing = (serieId)

    useEffect(() => {
        if (isEditing) {
          serieService.getSerieById(serieId)
            .then(response => {
              const serie = response.data;
              setTitle(serie.title);
              setDirector(serie.director);
              setSynopsis(serie.synopsis);
              setImage(serie.image);
              setVideo(serie.video);
              setGender(serie.gender);
              setRating(serie.rating);
              setSeasons(serie.seasons);
              setEpisodes(serie.episodes);
              setYear(serie.year);
            })
            .catch(error => {
              const errorDescription = error.response?.data?.message || "An error occurred";
              setErrorMessage(errorDescription);
            });
        }
      }, [isEditing, serieId]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = { title, director, synopsis, gender, rating, seasons, episodes, year, image, video }

        if (isEditing) { 
            serieService
            .updateSerie(serieId, formData)
            .then((response) => {
                console.log('Serie editada:', response.data);
                navigate(-1)
            })
            .catch((error) => {
                const errorDescription = error.response?.data?.message || "An error occurred";
                setErrorMessage(errorDescription);
            });
        } else {
            serieService
            .createSerie(formData)
            .then((response) => {
                console.log('Serie creada:', response.data);
                navigate('/series')
            })
            .catch((error) => {
                const errorDescription = error.response?.data?.message || "An error occurred";
                setErrorMessage(errorDescription);
            });
        }
    }

    return (
        <div className='flex m-auto items-center'>
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Titulo</span>
                        </label>
                        <input type="text" placeholder="Nombre" className="input input-bordered" onChange={(e) => setTitle(e.target.value)} value={title} required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Director</span>
                        </label>
                        <input type="text" placeholder="Email" className="input input-bordered" onChange={(e) => setDirector(e.target.value)} value={director} required />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Puntuacion</span>
                        </label>
                        <input type="text" placeholder="Contraseña" className="input input-bordered" onChange={(e) => setRating(e.target.value)} value={rating} required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Sinopsis</span>
                        </label>
                        <input type="textarea" placeholder="Contraseña" className="input input-bordered" onChange={(e) => setSynopsis(e.target.value)} value={synopsis} required />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Temporadas</span>
                        </label>
                        <input type="number" placeholder="Contraseña" className="input input-bordered" onChange={(e) => setSeasons(e.target.value)} value={seasons} required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Episodios</span>
                        </label>
                        <input type="number" placeholder="Contraseña" className="input input-bordered" onChange={(e) => setEpisodes(e.target.value)} value={episodes} required />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Género</span>
                        </label>
                        <select defaultValue="--" className="select select-success" onChange={(e) => setGender(e.target.value)} value={gender} required>
                            <option>Terror</option>
                            <option>Animación</option>
                            <option>Acción</option>
                            <option>Comedia</option>
                            <option>Thriller</option>
                            <option>Ciencia Ficción</option>
                            <option>Fantasía</option>
                            <option>Drama</option>
                        </select>
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Año</span>
                        </label>
                        <input type="number" placeholder="Año" className="input input-bordered" onChange={(e) => setYear(e.target.value)} value={year} required />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Portada</span>
                        </label>
                        <input type="text" placeholder="Género" className="input input-bordered" onChange={(e) => setImage(e.target.value)} value={image} required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Video</span>
                        </label>
                        <input type="text" placeholder="Género" className="input input-bordered" onChange={(e) => setVideo(e.target.value)} value={video} required />
                    </div>
                </div>

                <div className="form-control mt-6">
                    <button className="btn btn-primary">Añadir Serie</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    )
}
