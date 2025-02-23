import axios from 'axios';

const API_URL = "http://localhost:3000/api/";

const api = axios.create({baseURL: API_URL,});

export const getAllPokemons = async () => {
  try {
    const response = await api.get('/pokemons');
    console.log(response.data.pokemons)
    return response.data.pokemons;
  } catch (error) {
    console.error('Erreur lors de la récupération des Pokémon :', error);
    throw error;
  }
};

export const getPokemonById = async (id) => {
  try {
    const response = await api.get(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du Pokémon avec ID ${id} :`, error);
    throw error;
  }
};

export const createPokemon = async (data) => {
  try {
    const response = await api.post('/pokemon', data, {
      headers: {
        'Content-Type': 'multipart/form-date',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du Pokémon :', error);
    throw error;
  }
};

export const updatePokemon = async (id, data) => {
  try {
    const response = await api.put(`/pokemon/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du Pokémon avec ID ${id} :`, error);
    throw error;
  }
};

export const deletePokemon = async (id) => {
  try {
    const response = await api.delete(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression du Pokémon avec ID ${id} :`, error);
    throw error;
  }
};
