import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:80/api/v1', // Defina a URL base
});

export default api;
