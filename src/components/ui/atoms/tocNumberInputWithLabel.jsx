import React from 'react';

const TocNumberInputWithLabel = ({ label, id, value, onChange, min, max, placeholder }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="number"
        id={id}
        name={id} // Good practice for form submissions
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        placeholder={placeholder}
        className="w-sm shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default TocNumberInputWithLabel;