import React, { useState } from 'react';
import './MobileMockup.css';

import InteractiveQuiz from '../special-components/InteractiveQuiz';
import GoalSetter from '../special-components/GoalSetter';
import DecisionalBalanceSheet from '../special-components/DecisionalBalanceSheet';
import AlternativeActivityGenerator from '../special-components/AlternativeActivityGenerator';
import EvaluationQuiz from '../special-components/EvaluationQuiz';
import TextComponent from '../basic-components/Title';
import Paragraph from '../basic-components/Paragraph';
import ListItem from '../basic-components/ListItem';
import Date from '../basic-components/Date';
import Image from '../basic-components/Image';
import PlacementQuiz from '../special-components/PlacementQuiz';
import LinkButton from '../basic-components/LinkButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


const MobileMockup = ({
  headerText, components, onRemoveComponent, onMoveComponent,
  onUpdateComponentContent, appId
}) => {

  const [selectedComponentIndex, setSelectedComponentIndex] = useState(null);

  const handleComponentClick = (event, index) => {
    event.stopPropagation();
    setSelectedComponentIndex(index);
  };

  const renderComponent = (component, index) => {
    switch (component.type) {
      case 'Text':
        return <TextComponent key={index}

          content={component.content}
          onUpdate={(componentId, index, newContent) => onUpdateComponentContent(componentId, index, newContent, appId)}
          index={index}
          appId={appId}
          componentId={component._id}

        />;



      case 'ListItem':
        return <ListItem


          key={index}
          content={component.content}
          onUpdate={(componentId, index, newContent) => onUpdateComponentContent(componentId, index, newContent, appId)}
          appId={appId}
          index={index}
          componentId={component._id}
        />;
      case 'Paragraph':
        return <Paragraph

          key={index}
          content={component.content}
          onUpdate={(componentId, index, newContent) => onUpdateComponentContent(componentId, index, newContent, appId)}
          index={index}
          appId={appId}
          componentId={component._id}



        />;
      case 'DateComponent':
        return <Date

          key={index}
          content={component.content}
          onUpdate={(componentId, index, newContent) => onUpdateComponentContent(componentId, index, newContent, appId)}
          appId={appId}
          componentId={component._id}



        />;

      case 'LinkButton':
        return <LinkButton

          key={index}
          content={component.content}
          onUpdate={(componentId, index, newContent) => onUpdateComponentContent(componentId, index, newContent, appId)}
          index={index}
          appId={appId}
          
          componentId={component._id}
        />;

      case 'PlacementQuiz':
        return <PlacementQuiz

          component={component}

          key={index}
          onUpdateQuizContent={(componentId, index, newContent) => onUpdateComponentContent(componentId, index, newContent, appId)}
          index={index}
          appId={appId}
          componentId={component._id}

        />

      case 'InteractiveQuiz':
        return <InteractiveQuiz

          component={component}
          onUpdateQuizContent={(componentId, index, newContent) => onUpdateComponentContent(componentId, index, newContent, appId)}
          index={index}
          appId={appId}
          componentId={component._id}


        />;

      case 'GoalSetting':
        return <GoalSetter key={index} component={component} index={index} />;

      case 'DecisionalBalanceSheet':
        return <DecisionalBalanceSheet key={index} component={component} index={index} />;

      case 'AlternativeActivityGenerator':
        return <AlternativeActivityGenerator

          component={component}
          onUpdateComponentContent={(componentId, index, newContent) => onUpdateComponentContent(componentId, index, newContent, appId)}
          index={index}
          appId={appId}
          componentId={component._id}


        />;
      case 'EvaluationQuiz':

        return <EvaluationQuiz

          component={component}
          onUpdateComponentContent={(componentId, index, newContent) => onUpdateComponentContent(componentId, index, newContent, appId)}
          index={index}
          appId={appId}
          componentId={component._id}

        />;


      case 'Image':
        return (
          <Image
            key={index}
            content={component.content}
            onUpdate={(componentId, index, newContent) => onUpdateComponentContent(componentId, index, newContent, appId)}
            index={index}
            appId={appId}
            componentId={component._id}
          />
        );
      default:
        return <div key={index}>Unsupported component type</div>;
    }
  };

  return (
    <div className='MiddleBar' onClick={() => setSelectedComponentIndex(null)}>
      <div className="mobileMockup">
        <div className="mobileHeaderOne">

          <p id="headerText">{headerText.toUpperCase()}</p>
        </div>

        <div className="mobileContent">

          {components.map((component, index) => (
            <div key={index} className="componentWrapper" onClick={(event) => handleComponentClick(event, index)}>
              {renderComponent(component, index)}
              {selectedComponentIndex === index && (
                <div className="componentControls">
                  <button className="toolbar" onClick={(event) => {
                    event.stopPropagation();


                    onMoveComponent(component._id, 'down');

                  }}><FontAwesomeIcon icon={faArrowDown} /></button>
                  <button className="toolbar" onClick={(event) => {
                    event.stopPropagation();


                    onMoveComponent(component._id, 'up');


                  }}><FontAwesomeIcon icon={faArrowUp} /></button>
                  {component.type !== 'PlacementQuiz' && (
                    <button className="toolbar" onClick={(event) => { event.stopPropagation(); onRemoveComponent(index); }}> <FontAwesomeIcon icon={faTrash} /></button>
                  )}

                </div>
              )}
            </div>
          ))}


        </div>



      </div>


    </div>
  );
};

export default MobileMockup;
