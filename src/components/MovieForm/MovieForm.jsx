import React, { useEffect, useState } from 'react'
import movieService from '../../services/movies.service'
import { useNavigate, useParams } from 'react-router-dom'
import service from "../../services/file-upload.service";

export default function MovieForm() {
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [producer, setProducer] = useState('')
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState('')
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
          setImageUrl(movie.imageUrl);
          setVideoUrl(movie.videoUrl);
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Espera a que la imagen se suba antes de enviar el formulario.");
      return;
    }

    const formData = { title, director, synopsis, producer, gender, rating, duration, year, imageUrl, videoUrl };

    try {
      if (isEditing) {
        const response = await movieService.updateMovie(movieId, formData);
        console.log("Película editada:", response.data);
      } else {
        const response = await movieService.createMovie(formData);
        console.log("Película creada:", response.data);
      }
      navigate("/movies");
    } catch (error) {
      const errorDescription = error.response?.data?.message || "An error occurred";
      setErrorMessage(errorDescription);
    }
  };

  const handleFileUpload = async (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    try {
      const response = await service.uploadImage(uploadData);
      console.log("Image uploaded successfully:", response);
      setImageUrl(response.fileUrl);
    } catch (err) {
      console.error("Error while uploading the file:", err);
    }
  };


  const handleVideoUpload = async (e) => {
    const uploadData = new FormData();
    uploadData.append("videoUrl", e.target.files[0]);  // Aquí se sube el video

    try {
      const response = await service.uploadVideo(uploadData);
      console.log("Video uploaded successfully:", response);
      setVideoUrl(response.fileUrl);  // Guarda la URL del video
    } catch (err) {
      console.error("Error while uploading the video:", err);
    }
  };

  return (
    <div className='flex m-auto items-center'>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Título</span>
            </label>
            <input type="text" placeholder="Título" className="input input-bordered" onChange={(e) => setTitle(e.target.value)} value={title} required />
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Director</span>
            </label>
            <input type="text" placeholder="Director" className="input input-bordered" onChange={(e) => setDirector(e.target.value)} value={director} required />
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Productora</span>
            </label>
            <input type="text" placeholder="Productora" className="input input-bordered" onChange={(e) => setProducer(e.target.value)} value={producer} required />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Puntuación</span>
            </label>
            <input type="number" placeholder="Puntuación" className="input input-bordered" onChange={(e) => setRating(e.target.value)} value={rating} required />
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Duración</span>
            </label>
            <input type="number" placeholder="Duración" className="input input-bordered" onChange={(e) => setDuration(e.target.value)} value={duration} required />
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Año</span>
            </label>
            <input type="number" placeholder="Año" className="input input-bordered" onChange={(e) => setYear(e.target.value)} value={year} required />
          </div>
        </div>

        <div className="form-control mt-4">
          <textarea placeholder="Sinopsis" className="textarea textarea-bordered h-40 w-full resize-none" onChange={(e) => setSynopsis(e.target.value)} value={synopsis} required />
        </div>

        <div className="flex gap-4 mt-4">
          <div className="form-control w-1/2">
            <select className="select select-primary" onChange={(e) => setGender(e.target.value)} value={gender} required>
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
            <input type="file" className="file-input file-input-primary" onChange={(e) => handleFileUpload(e)} />
          </div>
          <div className="form-control w-1/2">
            <input type="file" className="file-input file-input-primary" accept="video/*" onChange={handleVideoUpload} />
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">{isEditing ? 'Editar Película' : 'Añadir Película'}</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}