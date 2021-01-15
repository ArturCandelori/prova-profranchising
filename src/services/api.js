import axios from 'axios';

const api = axios.create({
  baseURL: 'https://prova.profranchising.com.br',
});

export default api;
