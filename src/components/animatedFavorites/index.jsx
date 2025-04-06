import React from 'react';
import './index.css'; // Assurez-vous d'importer le fichier CSS mis à jour

const AnimatedFavorites = ({ favoritesList }) => {
  return (
    <div className="pokemonAnimationContainer">
      {favoritesList.map((pokemon) => (
        <img
          key={pokemon.id}
          src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name.english.toLowerCase()}.gif`}
          alt={pokemon.name}
          className="pokemonAnimation"
          style={{ animationDuration: `${Math.random() * 30 + 3}s` }} // Durée de l'animation aléatoire
        />
      ))}
    </div>
  );
};

export default AnimatedFavorites;
