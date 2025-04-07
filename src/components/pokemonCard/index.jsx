import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFavorite, removeFavorite, getFavorites } from '../../services/api'; // Assure-toi d'importer les fonctions nécessaires
import { toast } from 'react-toastify'; // Importer react-toastify

const PokemonCard = ({ pokemon, onToggleFavorite }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false); // Suivi de l'état du favori

  // Vérifier si le Pokémon est favori à chaque chargement de la carte
  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const favoritesList = await getFavorites();
        const favoritePokemons = favoritesList.map(p => p.id);
        setIsFavorite(favoritePokemons.includes(pokemon.id)); // Vérifie si le Pokémon est un favori
      } catch (error) {
        console.error('Erreur lors de la vérification des favoris', error);
      }
    };
    checkIfFavorite();
  }, [pokemon.id]);

  // Ajouter le Pokémon aux favoris
  const handleAddFavorite = async (event) => {
    event.stopPropagation(); // Empêche la propagation du clic pour éviter la navigation
    try {
      await addFavorite(pokemon._id);
      setIsFavorite(true); // Met à jour l'état pour refléter le statut de favori
      toast.success(`${pokemon.name.french} ajouté aux favoris!`); // Afficher un toast
      if (onToggleFavorite) {
        onToggleFavorite(); // 🔁 Met à jour les favoris dans Home
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout au favori', error);
    }
  };

  // Retirer le Pokémon des favoris
  const handleRemoveFavorite = async (event) => {
    event.stopPropagation(); // Empêche la propagation du clic pour éviter la navigation
    try {
      await removeFavorite(pokemon._id);
      setIsFavorite(false); // Met à jour l'état pour refléter le retrait des favoris
      toast.info(`${pokemon.name.french} retiré des favoris.`); // Afficher un toast
      if (onToggleFavorite) {
        onToggleFavorite(); // 🔁 Met à jour les favoris dans Home
      }
    } catch (error) {
      console.error('Erreur lors de la suppression des favoris', error);
    }
  };

  // Navigation vers la page de détails du Pokémon
  const handleClick = () => {
    navigate(`/pokemon/${pokemon._id}`);
  };

  return (
    <div className="relative cursor-pointer bg-white p-4 rounded-2xl shadow-lg w-80 border border-gray-200" onClick={handleClick}>
      {/* Cœur en haut à droite */}
      <div 
        className="absolute top-2 right-2 text-xl cursor-pointer"
        onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
      >
        {isFavorite ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-red-500" viewBox="0 0 24 24" stroke="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        )}
      </div>

      {/* Image du Pokémon */}
      <div className="flex justify-center">
        <img
          src={pokemon.image}
          alt={pokemon.name.french}
          width={120}
          height={120}
          className="rounded-lg"
        />
      </div>

      {/* Nom du Pokémon */}
      <h2 className="text-xl font-bold text-center mt-2">{pokemon.name.french}</h2>

      {/* Types du Pokémon */}
      <div className="flex justify-evenly mt-2">
        {pokemon.typeImages.map((typeImage, index) => {
          return (
            <img 
              key={index}
              src={typeImage}
              alt={`Type ${pokemon.types[index]}`} 
              className="w-1/3 h-full"
            />
          );
        })}
      </div>

      {/* Statistiques du Pokémon */}
      <div className="mt-4">
        {Object.entries(pokemon.stats).map(([stat, value]) => (
          <div key={stat} className="flex justify-between border-b py-1">
            <span className="font-medium text-gray-700">{stat}</span>
            <span className="font-bold text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
