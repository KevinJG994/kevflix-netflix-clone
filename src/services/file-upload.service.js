import axios from "axios";

const api = axios.create({
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    // withCredentials: true // => you might need this option if using cookies and sessions
});


const errorHandler = (err) => {
    throw err;
};

const uploadImage = (file) => {
    return api.post("/api/movies/upload", file)
        .then(res => res.data)
        .catch(errorHandler);
};

const uploadVideo = (file) => {
    return api.post("/api/movies/fileVideo", file)
        .then(res => res.data)
        .catch(errorHandler);
};


const uploadImageSerie = (file) => {
    return api.post("/api/series/upload", file)
        .then(res => res.data)
        .catch(errorHandler);
};

const uploadVideoSerie = (file) => {
    return api.post("/api/series/fileVideo", file)
        .then(res => res.data)
        .catch(errorHandler);
};


export default {
    uploadImage,
    uploadVideo,
    uploadImageSerie,
    uploadVideoSerie
};