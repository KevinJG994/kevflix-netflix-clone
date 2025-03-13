import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import serieService from '../../services/series.service'
import service from "../../services/file-upload.service";

export default function SerieForm() {
    const [title, setTitle] = useState('')
    const [director, setDirector] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
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
                    setImageUrl(serie.imageUrl);
                    setVideoUrl(serie.videoUrl);
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


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageUrl) {
            alert("Espera a que la imagen se suba antes de enviar el formulario.");
            return;
        }

        const formData = { title, director, synopsis, gender, rating, seasons, episodes, year, imageUrl, videoUrl }

        try {
            if (isEditing) {
                const response = await serieService.updateSerie(serieId, formData);
                console.log("Serie editada:", response.data);
            } else {
                const response = await serieService.createSerie(formData);
                console.log("Serie creada:", response.data);
            }
            navigate("/series");
        } catch (error) {
            const errorDescription = error.response?.data?.message || "An error occurred";
            setErrorMessage(errorDescription);
        }
    };

    const handleFileUpload = async (e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        try {
            const response = await service.uploadImageSerie(uploadData);
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
            const response = await service.uploadVideoSerie(uploadData);
            console.log("Video uploaded successfully:", response);
            setVideoUrl(response.fileUrl);  // Guarda la URL del video
        } catch (err) {
            console.error("Error while uploading the video:", err);
        }
    };

    return (
        <div className='flex m-auto items-center'>
            <form className="card-body p-0 w-96" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <div className="form-control w-1/3">
                        <label className="label">
                            <span className="label-text">Titulo</span>
                        </label>
                        <input type="text" placeholder="Titulo" className="input input-bordered" onChange={(e) => setTitle(e.target.value)} value={title} required />
                    </div>

                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Director</span>
                        </label>
                        <input type="text" placeholder="Director" className="input input-bordered" onChange={(e) => setDirector(e.target.value)} value={director} required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Puntuación</span>
                        </label>
                        <input type="number" placeholder="Puntuacion" className="input input-bordered" onChange={(e) => setRating(e.target.value)} value={rating} required />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Temporadas</span>
                        </label>
                        <input type="number" placeholder="Temporadas" className="input input-bordered" onChange={(e) => setSeasons(e.target.value)} value={seasons} required />
                    </div>

                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Episodios</span>
                        </label>
                        <input type="number" placeholder="Episodios" className="input input-bordered" onChange={(e) => setEpisodes(e.target.value)} value={episodes} required />
                    </div>

                </div>

                <div className="form-control mt-4">
                    <textarea placeholder="Sinopsis" className="textarea textarea-bordered h-20 w-full resize-none" onChange={(e) => setSynopsis(e.target.value)} value={synopsis} required />
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Género</span>
                        </label>
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
                        <input type="file" className="file-input file-input-primary" onChange={(e) => handleFileUpload(e)} />
                    </div>

                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Video</span>
                        </label>
                        <input type="file" className="file-input file-input-primary" accept="video/*" onChange={handleVideoUpload} />
                    </div>
                </div>

                <div className="form-control mt-6">
                    <button className="btn btn-primary">{isEditing ? 'Editar Serie' : 'Añadir Serie'}</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    )
}