import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPokemon, getPokemonById, updatePokemon } from '../../services/api';

const PokemonForm = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    Speed: '',
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

  useEffect(() => {
    if (isEdit && id) {
        console.log('toto');
        const fetchPokemon = async () => {
            try {
            const data = await getPokemonById(id);
            console.log(data);
            setName(data.name);
            setType(data.type);
            setBase(data.base);
            // Image et shinyImage peuvent être récupérées par une URL ou une logique supplémentaire
            } catch (error) {
            setError('Erreur lors du chargement du Pokémon.');
            }
        };
        fetchPokemon();
    }
  }, [id, isEdit]);

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
    
    // Ajouter chaque champ séparément au FormData
    formData.append('name', JSON.stringify(pokemonData.name));  // JSON.stringify pour envoyer sous forme de chaîne
    formData.append('type', JSON.stringify(pokemonData.type));  // De même pour 'type'
    formData.append('base', JSON.stringify(pokemonData.base));  // Et 'base'
    
    // Ajouter les fichiers images
    formData.append('image', image);  // Ajouter l'image
    formData.append('shinyImage', shinyImage);  // Ajouter l'image shiny
      
    try {
        if (isEdit) {
          await updatePokemon(id, formData);  // Appel pour mettre à jour
          if(res) {
            navigate(`/pokemon/${id}`);
          }
        } else {
          const newPokemon = await createPokemon(formData);  // Appel pour créer
          navigate(`/pokemon/${newPokemon.id}`);
        }
      } catch (error) {
        setError('Erreur lors de la soumission.');
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

export default PokemonForm;
