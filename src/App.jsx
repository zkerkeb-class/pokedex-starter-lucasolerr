// import { useState } from 'react';
// import './App.css';
// import pokemons from './assets/pokemons';
// import PokemonCard from './components/pokemonCard';
// import SearchBar from './components/searchBar';
// import FilterCheckbox from './components/filterCheckbox';

// function App() {
//   // Déstructuration d'un tableau (useState renvoie un tableau de 2 valeurs)
//   // On affecte la valeur 0 à searchTerm et la valeur term 1 à setSearchTerm 
//   const [searchTerm, setSearchTerm] = useState('');

//   const [selectedTypes, setSelectedTypes] = useState([]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredPokemons = pokemons.filter((pokemon) => {
//     const matchesName = pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = selectedTypes.length === 0 || selectedTypes.every(type => pokemon.type.includes(type));
//     return matchesName && matchesType;
//   });

//   const handleTypeChange = (type) => {
//     setSelectedTypes((prevSelectedTypes) =>
//       prevSelectedTypes.includes(type)
//         ? prevSelectedTypes.filter((t) => t !== type)
//         : [...prevSelectedTypes, type]
//     );
//   };

//   // Spread Operator créer un nouveau tableau
//   const allTypes = [...new Set(pokemons.flatMap((pokemon) => pokemon.type))];

//   // useEffect prend 2 paramètre à savoir une fonction et une liste de dépendances
//   // useEffect(() => { //mes actions }, [])

//   return (
//     <>
//       <div className="fixed top-0 left-0 w-full bg-white p-4 z-10 shadow-sm">
//         <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
//         <h3 className="text-left font-bold mt-2 mb-2">Filtrer par type :</h3>
//         <div className="flex flex-wrap gap-2">
//           {allTypes.map((type) => (
//             <FilterCheckbox 
//               key={type}
//               type={type}
//               isChecked={selectedTypes.includes(type)}
//               onChange={handleTypeChange}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-wrap gap-4 p-4 mt-35 justify-center">
//         {filteredPokemons.length > 0 ? (
//           filteredPokemons.map((pokemon, index) => (
//             <PokemonCard key={pokemon.id} pokemon={pokemon} />
//           ))
//         ) : (
//           <p>:( Aucun Pokémon trouvé</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import PokemonDetail from './screens/PokemonDetail';
import CreatePokemon from './screens/CreatePokemon';
import EditPokemon from './screens/EditPokemon';
import PokemonForm from './components/pokemonForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/create" element={<PokemonForm isEdit={false} />} />
        <Route path="/edit/:id" element={<PokemonForm isEdit={true} />} />
      </Routes>
    </Router>
  );
};

export default App;
