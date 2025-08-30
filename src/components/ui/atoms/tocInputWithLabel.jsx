import React from 'react';

const TocInputWithLabel = ({ id, label, type = 'text', placeholder = '', value, onChange, className, required, errmsg = '',onChangeCapture }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label} {required && <span className='text-red-700'>*</span>}
      </label>
      <input
        type={type}
        id={id}
        className={`shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${required ? 'border-red-700' : ''} ${className || ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onChangeCapture={onChangeCapture}
      />
      {errmsg && <hint className="text-red-700">{errmsg}</hint>}
    </div>
  );
};
export default TocInputWithLabel;