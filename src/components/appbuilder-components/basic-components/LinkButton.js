import React from 'react';

const LinkButton = ({ content, onUpdate, index, appId, componentId }) => {
  return (
    <div className="linkButtonContainer">
      <input
        className='URLInput'
        type="text"
        placeholder="Insert URL"
        value={content.url}
        onChange={e => onUpdate(componentId, index, { ...content, url: e.target.value }, appId)}
      />
      <input
        className='ButtonLabelInput'
        type="text"
        placeholder="Insert Button Label"
        value={content.label}
        onChange={e => onUpdate(componentId, index, { ...content, label: e.target.value }, appId)} 
      />
    </div>
  );
};

export default LinkButton;