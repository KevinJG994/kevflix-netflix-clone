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

  // GET /api/ai/recommend
  getAllRecommend = async (userId) => {
    return this.api.get("/api/ai/recommend", {
      params: { userId }, // Pasar el userId como parámetro de consulta
    });
  }
}

// Crear una instancia única del servicio
const recommendService = new RecommendService();

export default recommendService;