import '../App.css';
import { useEffect, useState } from 'react';
import { getAllPokemons, getFavorites } from '../services/api';
import PokemonCard from '../components/pokemonCard';
import SearchBar from '../components/searchBar';
import FilterCheckbox from '../components/filterCheckbox';
import Pagination from '@mui/material/Pagination';
import { useAuth } from '../services/auth';
import { UserIcon } from '@heroicons/react/24/solid';
import AnimatedFavorites from '../components/animatedFavorites';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allTypes, setAllTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  const limit = 20;

  const { user } = useAuth();

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPokemons(1, 1000, searchTerm, selectedTypes);
        setPokemons(data.pokemons);
        setAllTypes(data.types);
      } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemons();
  }, [searchTerm, selectedTypes]);

  const fetchFavorites = async () => {
    try {
      const favorites = await getFavorites();
      setFavoritesList(favorites);
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (isFavoriteFilter) {
      fetchFavorites();
    }
  }, [isFavoriteFilter]);

  useEffect(() => {
    let filtered = pokemons;

    if (isFavoriteFilter) {
      filtered = pokemons.filter(pokemon =>
        favoritesList.some(fav => fav.id === pokemon.id)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(pokemon =>
        selectedTypes.every(type => pokemon.types.includes(type))
      );
    }

    setFilteredPokemons(filtered);

    const totalFilteredPages = Math.ceil(filtered.length / limit);
    setTotalPages(totalFilteredPages);
  }, [isFavoriteFilter, pokemons, favoritesList, searchTerm, selectedTypes]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) => {
      const newTypes = prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type];
      setCurrentPage(1);
      return newTypes;
    });
  };

  const handleFavoriteFilterChange = () => {
    setIsFavoriteFilter(!isFavoriteFilter);
    setCurrentPage(1);
  };
  

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastPokemon = currentPage * limit;
  const indexOfFirstPokemon = indexOfLastPokemon - limit;

  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <>
      <AnimatedFavorites favoritesList={favoritesList} />
      <div className="fixed top-0 left-0 w-full bg-white p-4 z-10 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </div>
          <div className="ml-4 flex flex-col items-center text-sm text-gray-700">
            <UserIcon className="h-6 w-6 text-gray-700" />
            <span>{user?.nom || 'Utilisateur'}</span>
          </div>
        </div>

        <h3 className="text-left font-bold mt-4 mb-2">Filtrer par type :</h3>
        <div className="flex flex-wrap gap-2">
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
      <div className="flex justify-center mt-10">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          siblingCount={1}
        />
      </div>
      <div className='text-white'>
        Template
      </div>
    </>
  );
};

export default Home;
