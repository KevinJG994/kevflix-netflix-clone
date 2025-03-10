import React, { useEffect, useState } from 'react'
import movieService from '../../services/movies.service'
import { useNavigate, useParams } from 'react-router-dom'

export default function MovieForm() {
    const [title, setTitle] = useState('')
    const [director, setDirector] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [producer, setProducer] = useState('')
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [gender, setGender] = useState('')
    const [rating, setRating] = useState('')
    const [duration, setDuration] = useState('')
    const [year, setYear] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate()
    const { movieId } = useParams()
    const isEditing = (movieId)

    useEffect(() => {
        if (isEditing) {
          movieService.getMovieById(movieId)
            .then(response => {
              const movie = response.data;
              setTitle(movie.title);
              setDirector(movie.director);
              setSynopsis(movie.synopsis);
              setProducer(movie.producer);
              setImage(movie.image);
              setVideo(movie.video);
              setGender(movie.gender);
              setRating(movie.rating);
              setDuration(movie.duration);
              setYear(movie.year);
            })
            .catch(error => {
              const errorDescription = error.response?.data?.message || "An error occurred";
              setErrorMessage(errorDescription);
            });
        }
      }, [isEditing, movieId]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = { title, director, synopsis, producer, gender, rating, duration, year, image, video }

        if (isEditing) { 
        movieService
            .updateMovie(movieId, formData)
            .then((response) => {
                console.log('Película editada:', response.data);
                navigate(-1)
            })
            .catch((error) => {
                const errorDescription = error.response?.data?.message || "An error occurred";
                setErrorMessage(errorDescription);
            });
        } else {
            movieService
            .createMovie(formData)
            .then((response) => {
                console.log('Película creada:', response.data);
                navigate("/movies")
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
                            <span className="label-text">Productora</span>
                        </label>
                        <input type="text" placeholder="Contraseña" className="input input-bordered" onChange={(e) => setProducer(e.target.value)} value={producer} required />
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
                            <span className="label-text">Puntuación</span>
                        </label>
                        <input type="number" placeholder="Contraseña" className="input input-bordered" onChange={(e) => setRating(e.target.value)} value={rating} required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Duración</span>
                        </label>
                        <input type="number" placeholder="Contraseña" className="input input-bordered" onChange={(e) => setDuration(e.target.value)} value={duration} required />
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
                    <button className="btn btn-primary">Añadir Película</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    )
}
