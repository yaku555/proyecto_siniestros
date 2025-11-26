// src/api/axios.js
import axios from "axios";

// Base URL del backend
const instance = axios.create({
  baseURL: 'http://localhost:4000/api', // Asegúrate de que esto sea correcto
});

export default instance;
