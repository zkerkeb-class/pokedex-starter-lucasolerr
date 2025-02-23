import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonById, updatePokemon } from '../services/api';

const EditPokemon = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getPokemonById(id).then((pokemon) => setName(pokemon.name));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePokemon(id, { name });
    navigate('/');
  };

  return (
    <div>
      <h1>Modifier le Pokémon</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default EditPokemon;
