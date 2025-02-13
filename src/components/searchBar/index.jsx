// components/SearchBar.jsx
import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
    type="text"
    placeholder="Rechercher un Pokémon"
    value={searchTerm}
    onChange={onSearchChange}
    className="p-2 border rounded w-full"
    />
  );
}

export default SearchBar;
