import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Fonction fléchée () => {}
const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div className="cursor-pointer bg-white p-4 rounded-2xl shadow-lg w-80 border border-gray-200" onClick={handleClick}>
      <div className="flex justify-center">
        <img
          src={pokemon.image}
          alt={pokemon.name.french}
          width={120}
          height={120}
          className="rounded-lg"
        />
      </div>
      <h2 className="text-xl font-bold text-center mt-2">{pokemon.name.french}</h2>
      <div className="flex justify-evenly mt-2">
        {pokemon.typeImages.map((typeImage, index) => {
          return (
            <img 
              key={index}
              src={typeImage}
              alt={`Type ${pokemon.types[index]}`} 
              className="w-1/3 h-full"
            />
          ) 
        })}
      </div>
      <div className="mt-4">
        {Object.entries(pokemon.stats).map(([stat, value]) => (
          <div key={stat} className="flex justify-between border-b py-1">
            <span className="font-medium text-gray-700">{stat}</span>
            <span className="font-bold text-gray-900">{value}</span>
          </div>
        ))}
      </div>
      {/* <button onClick={() => setIsEditing(!isEditing)}> */}
        {/* {isEditing ? 'Annuler' : 'Modifier' } */}
      {/* </button> */}
    </div>
  );
};

export default PokemonCard;
