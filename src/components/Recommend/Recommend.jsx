import recommendService from "../../services/recommend.service";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Recommend() {
    const [recomendaciones, setRecomendaciones] = useState(null); // Estado para almacenar las recomendaciones
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const obtenerRecomendaciones = async () => {
            try {
                const response = await recommendService.getAllRecomendaciones(); // Llama al servicio
                setRecomendaciones(response.data); // Guarda las recomendaciones en el estado
            } catch (error) {
                console.error("Error al obtener recomendaciones:", error);
                setErrorMessage("Hubo un problema al obtener las recomendaciones.");
            } finally {
                setIsLoading(false); // Cambia el estado de carga
            }
        };

        obtenerRecomendaciones();
    }, []); // Ejecuta la solicitud al cargar el componente

    return (
        <div className="flex flex-col min-h-screen p-10 mt-20 m-auto calc-width-navbar">
            <h2 className="text-3xl mb-6 ml-12 text-center md:text-left">
                {recomendaciones?.genero
                    ? `Recomendaciones del género: ${recomendaciones.genero}`
                    : "Recomendaciones"}
            </h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-auto">
                        {/* Renderizar películas */}

                        {recomendaciones?.recomendaciones?.peliculas?.map((movie, index) => (
                            <Link key={movie._id || index} to={`/movieDetails/${movie._id}`}>
                                <div className="relative w-full min-w-0 h-96 shadow-xl overflow-hidden group">
                                    <figure className="w-full h-full">
                                        <img
                                            src={movie.imageUrl}
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </figure>
                                    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-3xl mb-2">{movie.title}</p>
                                        <div className="badge badge-primary text-2xl w-auto h-auto">
                                            {movie.year}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* Renderizar series */}
                        {recomendaciones?.recomendaciones?.series?.map((serie, index) => (
                            <Link key={serie._id || index} to={`/serieDetails/${serie._id}`}>
                                <div className="relative w-full min-w-0 h-96 shadow-xl overflow-hidden group">
                                    <figure className="w-full h-full">
                                        <img
                                            src={serie.imageUrl}
                                            alt={serie.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </figure>
                                    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-3xl mb-2">{serie.title}</p>
                                        <div className="badge badge-primary text-2xl w-auto h-auto">
                                            {serie.seasons} Temporadas
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}