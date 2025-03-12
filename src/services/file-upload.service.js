import axios from "axios";

const api = axios.create({
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: "http://localhost:5005/api"
    // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
    throw err;
};

const uploadImage = (file) => {
    return api.post("/movies/upload", file)
        .then(res => res.data)
        .catch(errorHandler);
};

const uploadVideo = (file) => {
    return api.post("/movies/fileVideo", file)
        .then(res => res.data)
        .catch(errorHandler);
};


const uploadImageSerie = (file) => {
    return api.post("/series/upload", file)
        .then(res => res.data)
        .catch(errorHandler);
};

const uploadVideoSerie = (file) => {
    return api.post("/series/fileVideo", file)
        .then(res => res.data)
        .catch(errorHandler);
};


export default {
    uploadImage,
    uploadVideo,
    uploadImageSerie,
    uploadVideoSerie
};