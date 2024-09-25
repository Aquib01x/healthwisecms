import React from 'react';

function Title({ content, onUpdate, index, appId, componentId }) {
 
  const handleChange = (e) => {
    const newContent = e.target.value;
    
    onUpdate(componentId, index, newContent, appId);
  };

  return (
    <>
      <input
        className='titleInput'
        type="text"
        placeholder="Insert Text"
        value={content}
        maxLength="50"
        onChange={handleChange} 
      />
      <div className="characterCount">
        {50 - content.length} remaining characters
      </div>
    </>
  );
}

export default Title;
