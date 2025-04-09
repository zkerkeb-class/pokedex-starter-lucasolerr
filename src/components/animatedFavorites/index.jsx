import React, { useEffect, useState } from 'react';
import './index.css';

const AnimatedFavorites = ({ favoritesList }) => {
  const [animationDurations, setAnimationDurations] = useState({});

  useEffect(() => {
    // Crée une copie locale pour éviter de modifier l'état directement
    const newDurations = { ...animationDurations };

    favoritesList.forEach((pokemon) => {
      if (!newDurations[pokemon.id]) {
        newDurations[pokemon.id] = `${Math.random() * 7 + 10}s`;
      }
    });

    setAnimationDurations(newDurations);
  }, [favoritesList]);

  return (
    <div className="pokemonAnimationContainer">
      {favoritesList.map((pokemon) => (
        <img
          key={pokemon.id}
          src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name.english.toLowerCase()}.gif`}
          alt={pokemon.name.english}
          className="pokemonAnimation"
          style={{ animationDuration: animationDurations[pokemon.id] || '10s' }}
        />
      ))}
    </div>
  );
};

export default AnimatedFavorites;
