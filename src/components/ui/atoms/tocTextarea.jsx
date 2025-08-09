import React from 'react';

const TocTextarea = ({ id, label, placeholder, value, onChange, rows = 3 }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      ></textarea>
    </div>
  );
};

export default TocTextarea;