import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function Image({ content, onUpdate, index, appId, componentId }) {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (upload) => {
       
        try {
          const base64Content = upload.target.result;
          await onUpdate(componentId, index, base64Content, appId);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="imageUploadWrapper">
      <div className="imageContainerOne">
        {content && <img src={content} alt="Uploaded" className="uploadedImage" />}
      </div>
      <input
        id={`file-input-${index}`}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      <label htmlFor={`file-input-${index}`} className="button">
        <FontAwesomeIcon icon={faUpload} />
      </label>
    </div>
  );
}

export default Image;
