// src/services/api.js
import axios from 'axios';

const API_URL = "http://localhost:3000/api/";

const api = axios.create({
  baseURL: API_URL
});

// Intercepteur pour ajouter le token dans Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // peut aussi venir du context si tu préfères
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getAllPokemons = async () => {
  try {
    const response = await api.get('/pokemons');
    return response.data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des Pokémon :', error);
    throw error;
  }
};

export const getPokemonById = async (id) => {
  try {
    const response = await api.get(`/pokemons/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du Pokémon avec ID ${id} :`, error);
    throw error;
  }
};

export const createPokemon = async (data) => {
  try {
    const response = await api.post('/pokemons', data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du Pokémon :', error);
    throw error;
  }
};

export const updatePokemon = async (id, data) => {
  try {
    const response = await api.put(`/pokemons/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du Pokémon avec ID ${id} :`, error);
    throw error;
  }
};

export const deletePokemon = async (id) => {
  try {
    const response = await api.delete(`/pokemons/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression du Pokémon avec ID ${id} :`, error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/user/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Erreur de connexion :', error);
    throw error.response?.data || error;
  }
};

export const registerUser = async (email, password, nom) => {
  try {
    const response = await api.post('/user/register', { email, password, nom });
    return response.data; // Retourne les données de la réponse
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
  }
};
