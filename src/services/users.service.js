import axios from 'axios';

class UserService {
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

  // GET /auth/users/:id
  getUserById = async (userId) => {
    return this.api.get(`/auth/users/${userId}`);
  }

  // PUT /auth/users/:id
  updateUser = async (userId, requestBody) => {
    return this.api.put(`/auth/users/${userId}`, requestBody);
  }

  // DELETE /auth/users/:id
  deleteUser = async (userId) => {
    return this.api.delete(`/auth/users/${userId}`);
  } 

}

// Create one instance of the service
const userService = new UserService();

export default userService;