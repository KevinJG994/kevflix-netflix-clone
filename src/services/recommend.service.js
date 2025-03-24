import axios from "axios";

class RecommendService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Configurar el token JWT automáticamente en los headers si está disponible
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  // GET /api/ai/recomendations
  getAllRecomendaciones = async () => {
    return this.api.get("/api/ai/recomendations");
  };
}

// Crear una instancia única del servicio
const recommendService = new RecommendService();

export default recommendService;