import React, { useEffect, useRef } from 'react';

function Paragraph({ content, onUpdate, index, appId, componentId }) {
  const textareaRef = useRef(null);


  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit'; 
      const scrollHeight = textareaRef.current.scrollHeight; 
      textareaRef.current.style.height = `${scrollHeight}px`; 
    }
  };


  useEffect(() => {
    adjustHeight();
  }, [content]);

  return (
    <>
      <textarea
        placeholder="Insert paragraph"
        value={content}
        onChange={e => {
        
          onUpdate(componentId, index, e.target.value, appId);
          adjustHeight(); 
        }}
        ref={textareaRef} 
        className="paragraphInput"
        style={{ overflow: 'hidden' }} 
        maxLength="256"
      ></textarea>
      <div className="characterCount">
        {256 - content.length} remaining characters
      </div>
    </>
  );
}

export default Paragraph;
