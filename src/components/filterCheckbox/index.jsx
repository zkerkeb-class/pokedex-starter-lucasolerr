import React from 'react';

const FilterCheckbox = ({ type, isChecked, onChange }) => {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        value={type}
        checked={isChecked}
        onChange={() => onChange(type)}
        className="mr-2"
      />
      {type}
    </label>
  );
};

export default FilterCheckbox;
