// src/services/file-upload.service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/api"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const getMovies = () => {
  return api.get("/movies")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("image", file); // Asegura que el campo coincida con el backend
  
    return api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" } // Indica que es un archivo
    })
    .then(res => res.data)
    .catch(errorHandler);
  };

const createMovie = (newMovie) => {
  return api.post("/movies", newMovie)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  getMovies,
  uploadImage,
  createMovie
};
