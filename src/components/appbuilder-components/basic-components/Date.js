import React from 'react';

function Date({ content, onUpdate, index, appId, componentId }) {
  return (
    <div className="dateComponent">
      <input
        type="date"
        value={content || ''}
        onChange={e => onUpdate(componentId, index, e.target.value, appId)} 
        className="dateInput"
      />
    </div>
  );
}

export default Date;