import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonById } from '../services/api';
import PokemonCard from '../components/pokemonCard';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null); // Etat pour gérer les erreurs

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
      <PokemonCard key={pokemon.id} pokemon={pokemon} />
    </div>  );
};

export default PokemonDetail;
