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
                    <input type="text" placeholder="Titulo" className="input input-bordered" onChange={(e) => setTitle(e.target.value)} value={title} required />
                </div>

                <div className="form-control w-1/2">
                    <input type="text" placeholder="Director" className="input input-bordered" onChange={(e) => setDirector(e.target.value)} value={director} required />
                </div>
                <div className="form-control w-1/2">
                    <input type="number" placeholder="Productora" className="input input-bordered" onChange={(e) => setProducer(e.target.value)} value={producer} required />
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                <div className="form-control w-1/2">
                    <input type="number" placeholder="Puntuacion" className="input input-bordered" onChange={(e) => setRating(e.target.value)} value={rating} required />
                </div>

                <div className="form-control w-1/2">
                    <input type="number" placeholder="Duración" className="input input-bordered" onChange={(e) => setDuration(e.target.value)} value={duration} required />
                </div>
                <div className="form-control w-1/2">
                    <input type="number" placeholder="Año" className="input input-bordered" onChange={(e) => setYear(e.target.value)} value={year} required />
                </div>
            </div>

            <div className="form-control mt-4">
                <textarea placeholder="Sinopsis" className="textarea textarea-bordered h-40 w-full resize-none" onChange={(e) => setSynopsis(e.target.value)} value={synopsis} required />
            </div>

            <div className="flex gap-4 mt-4">
                <div className="form-control w-1/2">
                    <select placeholder='Género' className="select select-primary" onChange={(e) => setGender(e.target.value)} value={gender} required>
                        <option value="" disabled>Género</option>
                        <option value="Terror">Terror</option>
                        <option value="Animación">Animación</option>
                        <option value="Acción">Acción</option>
                        <option value="Comedia">Comedia</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Ciencia Ficción">Ciencia Ficción</option>
                        <option value="Fantasía">Fantasía</option>
                        <option value="Drama">Drama</option>
                    </select>
                </div>

                <div className="form-control w-1/2">
                    <input type="text" placeholder="Portada" className="input input-bordered" onChange={(e) => setImage(e.target.value)} value={image} required />
                </div>

                <div className="form-control w-1/2">
                    <input type="text" placeholder="Video" className="input input-bordered" onChange={(e) => setVideo(e.target.value)} value={video} required />
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