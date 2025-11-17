import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000/api', // <- apunta al puerto del backend
});

export default instance;
