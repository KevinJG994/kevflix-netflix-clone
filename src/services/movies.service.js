import axios from 'axios';

class MoviesService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/movies
  createMovie = async (requestBody) => {
    return this.api.post('/api/movies', requestBody);
  }

  // GET /api/movies
  getAllMovies = async () => {
    return this.api.get('/api/movies');
  }

  // GET /api/movies/:movieId
  getMovieById = async (movieId) => {
    return this.api.get(`/api/movies/${movieId}`);
  }

  // PUT /api/movies/:movieId
  updateMovie = async (movieId, requestBody) => {
    return this.api.put(`/api/movies/${movieId}`, requestBody);
  }

  // DELETE /api/movies/:movieId
  deleteMovie = async (movieId) => {
    return this.api.delete(`/api/movies/${movieId}`);
  } 

}

// Create one instance of the service
const movieService = new MoviesService();

export default movieService;