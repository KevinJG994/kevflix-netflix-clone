import "../../App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import serieService from "../../services/series.service";
import Loading from "../../components/Loading/Loading";

export default function CardSerie() {
  const [series, setSeries] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    serieService
      .getAllSeries()
      .then((response) => {
        setSeries(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "An error occurred";
        setErrorMessage(errorDescription);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-10 mt-20 m-auto calc-width-navbar">
      <h2 className="text-3xl mb-6 ml-12 text-center md:text-left">
        Últimas Series
      </h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      {isLoading ? (
        <Loading />
      ) : (
      <div className="calc-width">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {series.map((item, index) => (
            <Link to="/movieDetails">
              <div key={index} className="relative w-full min-w-0 h-96 shadow-xl overflow-hidden group">
                <figure className="w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg mb-2">{item.title}</p>
                  <button className="bg-white text-black px-4 py-2 rounded-lg">
                    {item.year}
                  </button>
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