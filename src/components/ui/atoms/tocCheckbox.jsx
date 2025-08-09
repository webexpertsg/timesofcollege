import React from 'react';

const TocCheckbox = ({ label, id, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
      />
      {label && (
        <label htmlFor={id} className="text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
};

export default TocCheckbox;