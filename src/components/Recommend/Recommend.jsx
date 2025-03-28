import React, { useState, useEffect, useContext } from "react";
import recommendService from "../../services/recommend.service";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import "../../App.css";

export default function Recommend() {
    const [recommendations, setRecommendations] = useState({ peliculas: [], series: [] });
    const [genre, setGenre] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                if (!user?._id) {
                    setErrorMessage("Debes iniciar sesión para ver las recomendaciones.");
                    return;
                }

                const response = await recommendService.getAllRecommend(user._id);
                console.log("Recomendaciones recibidas:", response.data);

                const peliculas = response.data.recomendaciones.peliculas || [];
                const series = response.data.recomendaciones.series || [];

                setRecommendations({ peliculas, series });
                setGenre(response.data.genero);
                setErrorMessage("");
            } catch (error) {
                console.error("Error al obtener recomendaciones:", error);
                setErrorMessage("Hubo un problema al obtener las recomendaciones.");
            }
        };

        if (user) {
            fetchRecommendations();
        }
    }, [user]);

    return (
        <div className="flex flex-col min-h-screen p-10 mt-20 m-auto calc-width-navbar">
            <h2 className="text-3xl mb-6 ml-12 text-center md:text-left">
                Recomendaciones personalizadas
            </h2>

            {errorMessage && (
                <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}

            {!errorMessage && recommendations?.peliculas?.length === 0 && recommendations?.series?.length === 0 && (
                <p className="text-gray-500 text-center">No hay recomendaciones disponibles en este momento.</p>
            )}

            {!errorMessage && recommendations?.peliculas?.length > 0 && (
                <>
                    <h3 className="text-2xl mb-4 ml-12 text-center md:text-left">
                        Películas recomendadas en el género: <span className="font-bold text-primary-color">{genre}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recommendations.peliculas.map((movie, index) => (
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
                                        <div className="badge badge-primary text-2xl w-auto h-auto">{movie.year}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}

            {!errorMessage && recommendations?.series?.length > 0 && (
                <>
                    <h3 className="text-2xl mt-8 mb-4 ml-12 text-center md:text-left">
                        Series recomendadas en el género: <span className="font-bold text-primary-color">{genre}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recommendations.series.map((serie, index) => (
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
                                            Temporadas: {serie.seasons}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}