import { useState } from 'react';

const ImageUploader = ({ onFileSelect, name = 'image' }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect && onFileSelect(file); // Pass file to parent form
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        name={name}
        onChange={handleChange}
      />
      {preview && (
        <div style={{ marginTop: '10px' }}>
          <img src={preview} alt="Preview" width={200} />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;