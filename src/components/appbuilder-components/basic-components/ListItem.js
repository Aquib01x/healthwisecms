import React from 'react';

function ListItem({ content, onUpdate, index, appId, componentId }) {
  return (
    <div className="listItem">
      <span>{'\u2022'}</span>
      <input
        type="text"
        placeholder="List item text"
        value={content}
        maxLength="256"
        onChange={e => onUpdate(componentId, index, e.target.value, appId)} 
        
      />
      <div className="characterCount">
        {256 - content.length} remaining characters
      </div>
    </div>
  );
}

export default ListItem;