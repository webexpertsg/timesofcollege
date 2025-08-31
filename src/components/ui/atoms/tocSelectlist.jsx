// components/SelectList.jsx
import React from 'react';

const TocSelectList = ({ options, label, id, onChange, value, required, errmsg = '' }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
          {label} {required && <span className='text-red-700'>*</span>}
        </label>
      )}
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errmsg && <hint className="text-red-700">{errmsg}</hint>}
    </div>
  );
};

export default TocSelectList;