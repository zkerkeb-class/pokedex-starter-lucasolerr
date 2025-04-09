import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonById } from '../services/api';
import PokemonCard from '../components/pokemonCard';
import { GoHome } from "react-icons/go";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null); // Etat pour gérer les erreurs
  const navigate = useNavigate();

  useEffect(() => {
    getPokemonById(id)
      .then(setPokemon)
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError(`Pokémon avec l'ID ${id} introuvable`);
        } else {
          setError('Une erreur est survenue, veuillez réessayer plus tard');
        }
      });
  }, [id]);

  if (error) return <p>{error}</p>; // Affiche l'erreur si elle existe
  if (!pokemon) return <p>Chargement...</p>; // Affiche un message de chargement

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        className="absolute top-4 left-4 text-2xl cursor-pointer"
        onClick={() => navigate('/')} // Redirection vers la page d'accueil
      >
        <GoHome />
      </div>
      <PokemonCard key={pokemon.id} pokemon={pokemon} />
    </div>  );
};

export default PokemonDetail;
