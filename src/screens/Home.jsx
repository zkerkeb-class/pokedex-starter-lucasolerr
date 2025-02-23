import '../App.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPokemons } from '../services/api';
import PokemonCard from '../components/pokemonCard';
import SearchBar from '../components/searchBar';
import FilterCheckbox from '../components/filterCheckbox';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    getAllPokemons()
      .then((data) => setPokemons(data))
      .catch(console.error);
  }, []);

  const allTypes = [...new Set(pokemons.flatMap((pokemon) => pokemon.type))];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );
  };

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.every((type) => pokemon.type.includes(type));
    return matchesName && matchesType;
  });

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
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="text-center">:( Aucun Pokémon trouvé</p>
        )}
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
