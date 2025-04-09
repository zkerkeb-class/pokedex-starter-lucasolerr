import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFavorite, removeFavorite, getFavorites, updatePokemon, deletePokemon } from '../../services/api'; // Assure-toi d'importer la fonction deletePokemon
import { toast } from 'react-toastify'; // Importer react-toastify
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md"; // Importer l'icône de la poubelle

const PokemonCard = ({ pokemon, onToggleFavorite }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false); // Suivi de l'état du favori
  const [isEditing, setIsEditing] = useState(false); // Gère l'état d'édition
  const [name, setName] = useState(pokemon.name.french); // Nom modifiable
  const [stats, setStats] = useState(pokemon.stats); // Stats modifiables

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

  // Activer ou désactiver l'édition
  const handleEditToggle = async (event) => {
    event.stopPropagation();
    setIsEditing(!isEditing);
  };

  // Enregistrer les modifications de Pokémon
  const handleSaveChanges = async () => {
    try {
      // Création de l'objet contenant toutes les informations modifiées
      const updatedPokemon = {
        ...pokemon,  // Conserver toutes les informations existantes du Pokémon
        name: { ...pokemon.name, french: name },  // Modifier uniquement le nom en français
        stats: stats,  // Statistiques modifiées
      };

      // Mise à jour du Pokémon avec les informations complètes
      await updatePokemon(pokemon._id, updatedPokemon);

      setIsEditing(false);  // Désactiver le mode édition
      toast.success('Pokémon mis à jour avec succès!');  // Afficher un toast de succès
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du Pokémon');  // Afficher un toast d'erreur
      console.error('Erreur lors de la mise à jour du Pokémon', error);
    }
  };

  // Supprimer le Pokémon
  const handleDeletePokemon = async (event) => {
    event.stopPropagation(); // Empêche la propagation du clic pour éviter la navigation
    try {
      await deletePokemon(pokemon._id); // Appelle la fonction deletePokemon
      toast.success(`${pokemon.name.french} supprimé avec succès!`);
      // Rediriger vers la page d'accueil après suppression
      navigate('/', { replace: true });
    } catch (error) {
      toast.error('Erreur lors de la suppression du Pokémon');
      console.error('Erreur lors de la suppression du Pokémon', error);
    }
  };

  // Modifier le nom du Pokémon
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Modifier les statistiques du Pokémon
  const handleStatsChange = (stat, value) => {
    setStats((prevStats) => ({
      ...prevStats,
      [stat]: value
    }));
  };

  const handleClick = () => {
    navigate(`/pokemon/${pokemon._id}`);
  };

  return (
    <div className="relative cursor-pointer bg-white p-4 rounded-2xl shadow-lg w-80 border border-gray-200" onClick={handleClick}>
      {/* Icône baguette magique pour modifier le Pokémon */}
      <div 
        className="absolute top-2 left-2 text-xl cursor-pointer"
        onClick={handleEditToggle}
      >
        <MdOutlineEdit className="w-6 h-6 text-gray-400" />
      </div>

      {/* Icône poubelle (supprimer le Pokémon) */}
      {isEditing && (
        <div 
          className="absolute top-2 left-14 text-xl cursor-pointer"
          onClick={handleDeletePokemon}
        >
          <MdOutlineDelete className="w-6 h-6 text-gray-400" />
        </div>
      )}

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

      {/* Nom du Pokémon (Editable) */}
      <h2 className="text-xl font-bold text-center mt-2">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onClick={(e) => e.stopPropagation()}
            className="border p-1 rounded-lg w-full text-center"
          />
        ) : (
          name
        )}
      </h2>

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

      {/* Statistiques du Pokémon (Editable) */}
      <div className="mt-4">
        {Object.entries(stats).map(([stat, value]) => (
          <div key={stat} className="flex justify-between border-b py-1">
            <span className="font-medium text-gray-700">{stat}</span>
            {isEditing ? (
              <input
                type="number"
                value={value}
                onChange={(e) => handleStatsChange(stat, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-16 border p-1 rounded-lg text-center"
              />
            ) : (
              <span className="font-bold text-gray-900">{value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Bouton pour enregistrer les modifications */}
      {isEditing && (
        <div className="mt-4 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation
              handleSaveChanges();  // Call the function to save changes
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Enregistrer
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
