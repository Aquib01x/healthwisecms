import React, { useState,useEffect} from 'react';
import NavigationBar from '../components/home-components/navigation/NavigationBar';
import Dashboard from '../components/home-components/content/dashboard/Dashboard';
import AppCon from '../components/home-components/content/appcontainer/AppContainer'; 
import Partecipants from '../components/home-components/content/partecipants/Partecipants';
import Settings from '../components/home-components/content/settings/Settings';



function Home() {
 
  
    const [activeComponent, setActiveComponent] = useState(() => {
      const savedActiveComponent = localStorage.getItem('activeComponent');
      return savedActiveComponent || 'Dashboard';
    });

    useEffect(() => {
      localStorage.setItem('activeComponent', activeComponent);
    }, [activeComponent]);
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'AppCon':
        return <AppCon />;
      case 'Partecipants':
        return <Partecipants />;
        case 'Settings':
          return <Settings />;
      
      default:
        return <Dashboard />;
    }
  };

  

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F9FAFB' }}>
      <NavigationBar setActiveComponent={setActiveComponent} />
      {renderActiveComponent()}
    </div>
  );
}

export default Home;
