import React, { useState } from 'react';
import dashboardIcon from '../../../assets/icons/dashboard.png';
import dashboardIconActive from '../../../assets/icons/dashboardActive.png';
import logoutIcon from '../../../assets/icons/logout.png'; 
import appsIcon from '../../../assets/icons/list.png';
import appsIconActive from '../../../assets/icons/listActive.png';
import logoImage from '../../../assets/icons/logo.png';
import { useUserLogout } from '../../../hooks/useUserLogout.js'
import settingsIcon from '../../../assets/icons/settings.png';
import settingsIconActive from '../../../assets/icons/settingsIconActive.png';
import partecipantsIcon from '../../../assets/icons/partecipants.png';
import partecipantsIconActive from '../../../assets/icons/partecipantsIconActive.png';
import { useUserAuthContext } from "../../../hooks/useUserAuthContext.js";
import "./NavigationBar.css"

function NavigationBar({ setActiveComponent }) {

  const { user } = useUserAuthContext(); // auth



  const { logout } = useUserLogout()


  const [activeButton, setActiveButton] = useState(() => {

    const savedActiveButton = sessionStorage.getItem('activeButton');

    return savedActiveButton || 'Dashboard';
  });

  const handleClick = () => {

    logout()
  }



  const buttons = [
    { name: 'Dashboard', icon: dashboardIcon, activeIcon: dashboardIconActive },
    { name: 'All Apps', icon: appsIcon, activeIcon: appsIconActive },
    { name: 'Partecipants', icon: partecipantsIcon, activeIcon: partecipantsIconActive },
    { name: 'Settings', icon: settingsIcon, activeIcon: settingsIconActive },


  ];



  const handleButtonClick = (name) => {
    setActiveButton(name);
    sessionStorage.setItem('activeButton', name);
    switch (name) {
      case 'All Apps':
        setActiveComponent('AppCon');
        break;
      case 'Dashboard':
        setActiveComponent('Dashboard');
        break;
      case 'Partecipants':
        setActiveComponent('Partecipants');
        break;
      case 'Settings':
        setActiveComponent('Settings');
        break;


      default:

        setActiveComponent('ContentBar');
        break;
    }
  };



  return (
    <div style={{ width: '18%', borderRight: '1px solid #ddd', padding: '20px', backgroundColor: '#F9FAFB' }}>
      <div className="logoContainer">
        <img src={logoImage} alt="Logo" style={{ width: '40px', height: '40px', marginRight: '5px' }} />
        <span style={{ marginLeft: '10px' }}>Healthwise CMS</span>
      </div>
      <div className='userEmail'>

        {user.email}
      </div>
      {buttons.map((button) => (
        <div key={button.name} className={`buttonBase ${activeButton === button.name ? 'buttonActive' : ''}`} onClick={() => handleButtonClick(button.name)}>
          <img src={activeButton === button.name ? button.activeIcon : button.icon} alt={button.name} style={{ width: '20px', height: '20px' }} />
          <span style={{ marginLeft: '10px' }}>{button.name}</span>
        </div>


      ))}


      <div className="logoutButton">
        <button onClick={handleClick} className='buttonBase'>
          <img src={logoutIcon} alt="Logout" style={{ marginRight: '10px', width: '20px', height: '20px' }} /> Log out
        </button>
      </div>


    </div>
  );
}

export default NavigationBar;
