import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchMobileComponents from '../utils/serverRequestFunctions/fetchMobileComponents';
import Image from '../components/appbuilder-components/basic-components/Image.js'

import LinkButton from '../components/appbuilder-components/basic-components/LinkButton.js';

import Date from '../components/appbuilder-components/basic-components/Date.js';


import './Mobile.css';

import PlacementQuiz from '../components/appbuilder-components/special-components/PlacementQuiz.js';



const MobilePage = () => {

  const { appId } = useParams();
  const [components, setComponents] = useState({
    home: [],
    guidelines: [],
    precontemplation: [],
    contemplation: [],
    preparation: [],
    action: [],
    maintenance: [],
  });  const [visibleComponents, setVisibleComponents] = useState([]);

  const [targetContent, setTargetContent] = useState('');


  useEffect(() => {
    const fetchComponents = async () => {
      const screensComponents = await fetchMobileComponents(appId);
      setComponents(screensComponents); 
      setVisibleComponents(screensComponents.home); 
    };
    fetchComponents();
  }, [appId]);

  const handleRedirect = (url) => {
    window.open(url, '_blank');
  };

  const handleHomeClick = () => {
    setVisibleComponents(components.home);
  };

  const handleGuidelinesClick = () => {
    setVisibleComponents(components.guidelines);
  };



  const handleStageClick = () => {
    if (targetContent) {
        setVisibleComponents(components[targetContent]);
    }
    
};


  const handleQuizSubmit = (selectedOption) => {
    const screenMap = {
        0: 'precontemplation',
        1: 'contemplation',
        2: 'preparation',
        3: 'action',
        4: 'maintenance',
    };
    const selectedScreen = screenMap[selectedOption];
    if (selectedScreen) {
        setTargetContent(selectedScreen); 
        alert(`You have been placed in ${selectedScreen}, please click the stage button to access the content.`);
    }

    
  
};

const DisplayImage = ({ src }) => {
  return (
    <div className="displayImageContainer">
      {src && <img src={src} alt="Display" className="displayedImage" />}
    </div>
  );
};



  return (
    <div className="mobilePreview">
      <div>
        {visibleComponents.map((component, index) => {
          switch (component.type) {
            case 'Text': return <p key={index} className="mobileText">{component.content}</p>;
            case 'Paragraph': return <p key={index} className="mobileParagraph">{component.content}</p>;
            case 'Image': return <DisplayImage key={index} src={component.content} />;
            case 'ListItem': return <li key={index} className="mobileListItem">{component.content}</li>;

            case 'LinkButton':
              return (
                <button
                  key={index}
                  onClick={() => handleRedirect(component.content.url)}
                  className="mobileLinkButton"
                >
                  {component.content.label}
                </button>
              );

              
              case 'DateComponent':
                return <Date 
                
                key={index}
          content={component.content}
        
                
                
                />;
                    case 'PlacementQuiz': return (
              <PlacementQuiz 
                key={index} 
                component={component} 
                index={index} 
                appId={appId} 
                componentId={component._id}
                isEditMode={false}
                onSubmit={handleQuizSubmit}
              />
            );
            default: return null;
          }
        })}
      </div>
      <div className="mobileFooter">
        <button className="footerButton" onClick={handleHomeClick}>Home</button>
        <button className="footerButton" onClick={handleGuidelinesClick}>Guidelines</button>
        <button className="footerButton" onClick={handleStageClick}>Stage</button>
      </div>
    </div>
  );
};

export default MobilePage;