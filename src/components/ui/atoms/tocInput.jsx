import React from 'react';

const TocInput = ({ type = 'text', placeholder, className, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`
        border border-gray-300 rounded-md
        py-2 px-4
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        ${className || ''}
      `}
      {...props}
    />
  );
};

export default TocInput;