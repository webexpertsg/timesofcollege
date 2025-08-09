    import React from 'react';

    const TocNumberInput = ({ value, onChange, placeholder, min, max }) => {
      return (
        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          className="w-sm  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      );
    };

    export default TocNumberInput;