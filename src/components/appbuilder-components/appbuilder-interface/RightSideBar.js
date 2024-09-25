import React from 'react';
import './RightSideBar.css';

import title from '../../../assets/icons/title.png';
import Paragraph from '../../../assets/icons/paragraph.png';
import List from '../../../assets/icons/list.png'
import Image from '../../../assets/icons/image.png'
import Date from '../../../assets/icons/date.png'
import Link from '../../../assets/icons/link.png'

import InteractiveQuiz from '../../../assets/icons/interactiveQuiz.png'
import DBSheet from '../../../assets/icons/decisionalBalanceSheet.png'

import GoalSetting from '../../../assets/icons/goalSetting.png'

import EvaluationQuiz from '../../../assets/icons/evaluationQuiz.png'


import activityGen from '../../../assets/icons/activityGen.png'



const RightSideBar = ({ onAddComponent, headerText }) => {



  const buttons = [
    { name: 'Text', label: 'Title', icon: title, marginText: '0px', marginImage: '10px' },
    { name: 'Paragraph', label: 'Paragraph', icon: Paragraph, marginText: '-10px', marginImage: '10px' },
    { name: 'ListItem', label: 'List', icon: List, marginText: '0px', marginImage: '10px' },
    { name: 'Image', label: 'Image', icon: Image, marginText: '5px', marginImage: '10px' },
    { name: 'DateComponent', label: 'Date', icon: Date, marginText: '0px', marginImage: '10px' },
    { name: 'LinkButton', label: 'Link', icon: Link, marginText: '0px', marginImage: '10px' },

  ];


  const specialButtons = [
    { name: 'InteractiveQuiz', label: 'Interactive Quiz', icon: InteractiveQuiz, condition: 'precontemplation', marginText: '-65px', marginImage: '-25px' },


    { name: 'DecisionalBalanceSheet', label: 'DB Sheet', icon: DBSheet, condition: 'contemplation', marginText: '-65px', marginImage: '-25px' },
    { name: 'GoalSetting', label: 'Goal Setter', icon: GoalSetting, condition: 'preparation', marginText: '-65px', marginImage: '-25px' },
    { name: 'EvaluationQuiz', label: 'Evaluation Quiz', icon: EvaluationQuiz, condition: 'action', marginText: '0px', marginImage: '0px' },
    { name: 'AlternativeActivityGenerator', label: 'Activity Generator', icon: activityGen, condition: 'maintenance', marginText: '5px', marginImage: '5px' },

  ];



  return (
    <div style={{ width: '18%', borderLeft: '1px solid #ddd', padding: '20px', position: 'absolute', right: '20px', top: '70px' }}>
      <div className="rightSideBar">

        <div className="rightSideBarContents">

          <span style={{ marginLeft: '10px' }}>Components</span>

        </div>



        {buttons.map((button) => (
          <div key={button.name} className="rightSideBarButtonBase" onClick={() => { onAddComponent(button.name) }}




          >
            <img src={button.icon} alt={button.name} style={{ width: '22px', height: '22px', display: 'block', padding: '5px', marginLeft: button.marginImage }} />
            <span style={{ marginLeft: button.marginText }}>{button.label}</span>
          </div>
        ))}

        {specialButtons.filter(button => button.condition === headerText).map((button) => (
          <div key={button.name} className="rightSideBarButtonBase" onClick={() => onAddComponent(button.name)}
          >
            <img src={button.icon} alt={button.name} style={{ width: '22px', height: '22px', display: 'block', padding: '5px', marginLeft: button.marginImage }} />
            <span style={{ marginLeft: button.marginText }}>{button.label}</span>

          </div>
        ))}

      </div>
    </div>

  );
};


export default RightSideBar


