import React from 'react';

const FilterCheckbox = ({ type, label, isChecked, onChange }) => {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onChange(type)}
        className="mr-2"
      />
      {label || type}
    </label>
  );
};

export default FilterCheckbox;
