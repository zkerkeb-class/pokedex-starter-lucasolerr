import '../App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPokemons, getFavorites } from '../services/api';
import PokemonCard from '../components/pokemonCard';
import SearchBar from '../components/searchBar';
import FilterCheckbox from '../components/filterCheckbox';
import Pagination from '@mui/material/Pagination'; // Importation du composant Pagination de Material-UI
import { toast } from 'react-toastify';
import { useAuth } from '../services/auth';
import { UserIcon } from '@heroicons/react/24/solid'; // Assure-toi d'avoir heroicons installé
import AnimatedFavorites from '../components/animatedFavorites'; // Assure-toi d'importer ton composant d'animation

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]); // Pour filtrer les Pokémon en fonction des favoris
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const [allTypes, setAllTypes] = useState([]); // Tous les types de pokémons
  const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement
  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false); // Filtrer par favoris
  const [favoritesList, setFavoritesList] = useState([]); // Liste des favoris

  const limit = 20; // Nombre de pokémons par page

  const { user } = useAuth();

  // 1. Récupérer tous les Pokémon
  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPokemons(1, 1000, searchTerm, selectedTypes); // Récupérer tous les pokémons
        setPokemons(data.pokemons);
        setAllTypes(data.types); // Récupère tous les types de pokémons
      } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemons();
  }, [searchTerm, selectedTypes]);

  // 2. Récupérer tous les favoris
  const fetchFavorites = async () => {
    try {
      const favorites = await getFavorites();
      setFavoritesList(favorites); // Met à jour la liste des favoris
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    // On refait l'appel à l'API pour récupérer les favoris à chaque activation/désactivation du filtre
    if (isFavoriteFilter) {
      fetchFavorites();
    }
  }, [isFavoriteFilter]);

  // 3. Appliquer le filtre des favoris
  useEffect(() => {
    let filtered = pokemons;

    // Applique le filtre des favoris si activé
    if (isFavoriteFilter) {
      filtered = pokemons.filter(pokemon =>
        favoritesList.some(fav => fav.id === pokemon.id) // Vérifie si le Pokémon est dans la liste des favoris
      );
    }

    // Appliquer la recherche
    if (searchTerm) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Appliquer le filtre des types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(pokemon =>
        selectedTypes.every(type => pokemon.types.includes(type))
      );
    }

    setFilteredPokemons(filtered);

    // Recalculer le nombre total de pages basé sur les pokémons filtrés
    const totalFilteredPages = Math.ceil(filtered.length / limit);
    setTotalPages(totalFilteredPages);
  }, [isFavoriteFilter, pokemons, favoritesList, searchTerm, selectedTypes]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Réinitialise la page lors de la recherche
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) => {
      const newTypes = prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type];
      setCurrentPage(1); // Réinitialise la page lors du changement de filtre
      return newTypes;
    });
  };

  const handleFavoriteFilterChange = () => {
    setIsFavoriteFilter(!isFavoriteFilter); // Active ou désactive le filtre des favoris
    setCurrentPage(1); // Réinitialise la page lors de l'activation/désactivation du filtre favoris
  };
  

  const handlePageChange = (event, page) => {
    setCurrentPage(page); // Met à jour la page courante lors de l'interaction avec la pagination
  };

  // Calculer l'index du premier et du dernier Pokémon sur la page courante
  const indexOfLastPokemon = currentPage * limit;
  const indexOfFirstPokemon = indexOfLastPokemon - limit;

  // Liste des Pokémon à afficher sur la page courante
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <>
      <AnimatedFavorites favoritesList={favoritesList} />
      <div className="fixed top-0 left-0 w-full bg-white p-4 z-10 shadow-sm">
        {/* Ligne du haut : SearchBar + icône user */}
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </div>
          <div className="ml-4 flex flex-col items-center text-sm text-gray-700">
            <UserIcon className="h-6 w-6 text-gray-700" />
            <span>{user?.nom || 'Utilisateur'}</span>
          </div>
        </div>

        {/* Filtres */}
        <h3 className="text-left font-bold mt-4 mb-2">Filtrer par type :</h3>
        <div className="flex flex-wrap gap-2">
          {/* Bouton pour afficher/masquer les favoris */}
          <FilterCheckbox
            type="favorite"
            isChecked={isFavoriteFilter}
            onChange={handleFavoriteFilterChange}
            label="favorite"
          />
          {allTypes.map((type) => (
            <FilterCheckbox
              key={type}
              type={type}
              isChecked={selectedTypes.includes(type)}
              onChange={handleTypeChange}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 p-4 mt-35 justify-center">
        {isLoading ? (
          <p className="text-center">Chargement...</p>
        ) : currentPokemons.length > 0 ? (
          currentPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} onToggleFavorite={fetchFavorites}/>
          ))
        ) : (
          <p className="text-center">:( Aucun Pokémon trouvé</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          siblingCount={1} // Nombre de pages affichées autour de la page courante
        />
      </div>

      <div className="text-center mt-10">
        <Link to="/create" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
          Créer un Pokémon
        </Link>
      </div>
    </>
  );
};

export default Home;
