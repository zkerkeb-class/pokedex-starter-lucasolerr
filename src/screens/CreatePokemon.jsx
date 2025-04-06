import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPokemon } from '../services/api';

const AddPokemonForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState({
    english: '',
    japanese: '',
    chinese: '',
    french: ''
  });
  const [type, setType] = useState([]); // Un tableau pour gérer plusieurs types
  const [base, setBase] = useState({
    HP: '',
    Attack: '',
    Defense: '',
    "Sp. Attack": '',
    "Sp. Defense": '',
    Speed: ''
  });
  const [image, setImage] = useState(null);
  const [shinyImage, setShinyImage] = useState(null);
  const [error, setError] = useState('');

  // Liste des types de Pokémon
  const pokemonTypes = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 
    'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 
    'Steel', 'Fairy'
  ];

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validation basique des champs
    if (!name.english || !name.japanese || !name.chinese || !name.french) {
      setError('Tous les noms doivent être remplis (anglais, japonais, chinois, français).');
      return;
    }
  
    if (type.length === 0) {
      setError('Le type du Pokémon doit être spécifié.');
      return;
    }
  
    if (Object.values(base).some(value => !value)) {
      setError('Toutes les statistiques de base doivent être remplies.');
      return;
    }
  
    if (!image || !shinyImage) {
      setError('Les images sont requises.');
      return;
    }
  
    // Créer un objet JSON pour les données
    const pokemonData = {
      name, 
      type,
      base
    };
  
    // Créer un FormData pour inclure les fichiers image
    const formData = new FormData();
    formData.append('pokemon', JSON.stringify(pokemonData)); // Ajouter le JSON des données de base
    formData.append('image', image);  // Ajouter l'image
    formData.append('shinyImage', shinyImage);  // Ajouter l'image shiny
  
    try {
      const newPokemon = await createPokemon(formData);  // Appel API
      navigate(`/pokemon/${newPokemon._id}`); // Redirection après création
    } catch (error) {
      setError('Erreur lors de la création du Pokémon. Veuillez réessayer.');
    }
  };
  

  // Fonction pour gérer la sélection des types
  const handleTypeChange = (event) => {
    const selectedTypes = Array.from(event.target.selectedOptions, (option) => option.value);
    console.log(selectedTypes);
    setType(selectedTypes);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-6">Ajouter un Pokémon</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom en Anglais:</label>
          <input
            type="text"
            value={name.english}
            onChange={(e) => setName({ ...name, english: e.target.value })}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom en Japonais:</label>
          <input
            type="text"
            value={name.japanese}
            onChange={(e) => setName({ ...name, japanese: e.target.value })}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom en Chinois:</label>
          <input
            type="text"
            value={name.chinese}
            onChange={(e) => setName({ ...name, chinese: e.target.value })}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom en Français:</label>
          <input
            type="text"
            value={name.french}
            onChange={(e) => setName({ ...name, french: e.target.value })}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type(s) du Pokémon:</label>
          <select
            multiple
            value={type}
            onChange={handleTypeChange}  // Mise à jour de la fonction pour gérer la sélection multiple
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {pokemonTypes.map((typeOption) => (
              <option key={typeOption} value={typeOption}>
                {typeOption}
              </option>
            ))}
          </select>
          <small className="block mt-2 text-gray-500">Sélectionne un ou plusieurs types.</small>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Statistiques de Base:</label>
          {Object.keys(base).map((stat) => (
            <div key={stat} className="flex items-center mb-4">
              <label className="w-1/3 text-sm font-medium text-gray-700">{stat}:</label>
              <input
                type="number"
                value={base[stat]}
                onChange={(e) => setBase({ ...base, [stat]: e.target.value })}
                required
                className="mt-1 block w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image du Pokémon:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image Shiny du Pokémon:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setShinyImage(e.target.files[0])}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Ajouter le Pokémon
        </button>
      </form>
    </div>
  );
};

export default AddPokemonForm;
