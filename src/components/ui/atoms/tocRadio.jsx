import React from 'react';

const TocRadioInput = ({ id, name, value, label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      />
      <label htmlFor={id} className="ml-2 text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default TocRadioInput;