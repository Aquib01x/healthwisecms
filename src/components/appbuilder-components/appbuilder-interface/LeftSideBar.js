import React, { useState } from 'react';
import './LeftSideBar.css';
import homeIcon from '../../../assets/icons/home.png'
import homeIconActive from '../../../assets/icons/homeActive.png'
import guidelinesIcon from '../../../assets/icons/guidelines.png';
import guidelinesIconActive from '../../../assets/icons/guidelinesActive.png'
import precontemplationIcon from '../../../assets/icons/precontemplation.png';
import precontemplationIconActive from '../../../assets/icons/precontemplationActive.png';
import contemplationIcon from '../../../assets/icons/contemplation.png';
import contemplationIconActive from '../../../assets/icons/contemplationActive.png';
import preparationIcon from '../../../assets/icons/preparation.png';
import preparationIconActive from '../../../assets/icons/preparationActive.png';
import actionIcon from '../../../assets/icons/action.png';
import actionIconActive from '../../../assets/icons/actionActive.png';
import maintenanceIcon from '../../../assets/icons/maintenance.png';
import maintenanceIconActive from '../../../assets/icons/maintenanceActive.png';


const LeftSideBar = ({ onButtonClick }) => {
  const [activeButton, setActiveButton] = useState('');


  const buttons = [
    { name: 'home', icon: homeIcon, activeIcon: homeIconActive },
    { name: 'guidelines', icon: guidelinesIcon, activeIcon: guidelinesIconActive },
    { name: 'precontemplation', icon: precontemplationIcon, activeIcon: precontemplationIconActive },
    { name: 'contemplation', icon: contemplationIcon, activeIcon: contemplationIconActive },
    { name: 'preparation', icon: preparationIcon, activeIcon: preparationIconActive },
    { name: 'action', icon: actionIcon, activeIcon: actionIconActive },
    { name: 'maintenance', icon: maintenanceIcon, activeIcon: maintenanceIconActive },

  ];




  return (
    <div style={{ width: '18%', borderRight: '1px solid #ddd', padding: '20px', backgroundColor: '#F9FAFB' }}>

      <div className="leftSideBar">
        <div className="leftSideBarContents">

          <span style={{ marginLeft: '10px' }}>Screens</span>

        </div>



        {buttons.map((button) => (
          <div key={button.name} 
          className={`leftSideBarButtonBase ${activeButton === button.name ? 'leftSideBarButtonActive' : ''}`}
          onClick={() => { setActiveButton(button.name); onButtonClick(button.name) }}


          >
            <img src={activeButton === button.name ? button.activeIcon : button.icon} alt={button.name} style={{ width: '20px', height: '20px' }} />
            <span style={{ marginLeft: '10px' }}>{button.name.toUpperCase().charAt(0) + button.name.slice(1)}</span>
          </div>
        ))}


      </div>
    </div>

  )
}

export default LeftSideBar;
