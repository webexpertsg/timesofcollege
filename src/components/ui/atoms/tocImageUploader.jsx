// components/ImageUploader.jsx
"use client"; // If using App Router and client-side functionality

import React, { useState } from 'react';

const TocImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />
      {selectedImage && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Selected Image:</h3>
          {/* Display the image using Next.js Image component */}
          <Image
            src={selectedImage}
            alt="Uploaded Image"
            width={300} // Set appropriate width
            height={200} // Set appropriate height
            className="rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default TocImageUploader;