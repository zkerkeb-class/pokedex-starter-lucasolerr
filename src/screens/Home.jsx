import '../App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPokemons } from '../services/api';
import PokemonCard from '../components/pokemonCard';
import SearchBar from '../components/searchBar';
import FilterCheckbox from '../components/filterCheckbox';
import Pagination from '@mui/material/Pagination'; // Importation du composant Pagination de Material-UI
import { toast } from 'react-toastify';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const [allTypes, setAllTypes] = useState([]); // Tous les types de pokémons
  const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement

  const limit = 20; // Nombre de pokémons par page

  useEffect(() => {
    setIsLoading(true);
    getAllPokemons(currentPage, limit, searchTerm, selectedTypes)
      .then((data) => {
        setPokemons(data.pokemons);
        setTotalPages(data.totalPages);
        setAllTypes(data.types); // Récupère tous les types de pokémons
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [currentPage, searchTerm, selectedTypes]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) => {
      const newTypes = prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type) // Désélectionne le type
        : [...prevTypes, type]; // Ajoute le type sélectionné
  
      // Mettre la page à 1 chaque fois qu'un filtre est modifié
      setCurrentPage(1);
  
      return newTypes;
    });
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page); // Met à jour la page courante lors de l'interaction avec la pagination
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white p-4 z-10 shadow-sm">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <h3 className="text-left font-bold mt-2 mb-2">Filtrer par type :</h3>
        <div className="flex flex-wrap gap-2">
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
        ) : pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
