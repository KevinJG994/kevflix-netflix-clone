import React, { useState, useEffect, useContext } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

export default function FavouritePage() {
  const [favorites, setFavorites] = useState([]);

  // Obtener el ID del usuario desde localStorage
  const { userId } = useContext(AuthContext);

  // Cargar favoritos desde localStorage usando una clave única para el usuario
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
    setFavorites(storedFavorites);
  }, [userId]);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
  }, [favorites, userId]);

  const getItemType = (item) => {
    if (item.type) {
      return item.type;
    }
    // Verificar propiedades específicas para determinar el tipo
    if (item.director && item.duration) {
      return "movie";
    }
    if (item.seasons && item.episodes) {
      return "serie";
    }
    return "unknown";
  };

  return (
    <div className="flex flex-col min-h-screen p-10 mt-20 m-auto calc-width-navbar">
      <h2 className="text-3xl mb-6 ml-12 text-center md:text-left">
        Películas y Series Favoritas
      </h2>

      <div className="calc-width">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((item, index) => {
            const itemType = getItemType(item);
            return (
              <Link to={itemType === "movie" ? `/movieDetails/${item._id}` : `/serieDetails/${item._id}`} key={index}>
                <div key={index} className="relative w-full min-w-0 h-96 shadow-xl overflow-hidden group" >
                  <figure className="w-full h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-3xl mb-2">{item.title}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}