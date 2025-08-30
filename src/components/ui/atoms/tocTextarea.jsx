import React from 'react';

const TocTextarea = ({ id, label, placeholder, value, onChange, rows = 3, required, errmsg = ''}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
          {label} {required && <span className='text-red-700'>*</span>}
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
      {errmsg && <hint className="text-red-700">{errmsg}</hint>}
    </div>
  );
};

export default TocTextarea;