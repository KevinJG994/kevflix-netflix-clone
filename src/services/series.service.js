import axios from 'axios';

class SeriesService {
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

  // POST /api/series
  createSerie = async (requestBody) => {
    return this.api.post('/api/series', requestBody);
  }

  // GET /api/series
  getAllSeries = async () => {
    return this.api.get('/api/series');
  }

  // GET /api/series/:serieId
  getSerieById = async (serieId) => {
    return this.api.get(`/api/series/${serieId}`);
  }

  // PUT /api/series/:serieId
  updateSerie = async (serieId, requestBody) => {
    return this.api.put(`/api/series/${serieId}`, requestBody);
  }

  // DELETE /api/series/:serieId
  deleteSerie = async (serieId) => {
    return this.api.delete(`/api/series/${serieId}`);
  } 

}

// Create one instance of the service
const serieService = new SeriesService();

export default serieService;