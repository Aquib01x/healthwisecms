import React, { useState, useEffect } from 'react';
import './AppContainer.css';
import CreateAppButton from './CreateApp.js';
import App from './GeneratedApp.js';
import { useUserAuthContext } from "../../../../hooks/useUserAuthContext.js";
import fetchApps from '../../../../utils/serverRequestFunctions/fetchApps.js'; 

const AppContainer = () => {

  const [apps, setApps] = useState([]);
  const { user } = useUserAuthContext();//auth


  const addApp = (newApp) => {
    setApps(currApps => [...currApps, newApp]);
  };


  useEffect(() => {
    if (user) {
      fetchApps(user)
        .then(data => {
          setApps(data);
        })
        .catch(error => {
          console.error('Error fetching apps:', error);
        });
    }
  }, [user]);


  return (

    <div>
      <div className="appCon">

        <div className="appConHeader">
          <h1 style={{
            marginTop: '64px', marginBottom: '100px', marginLeft: '30px', fontSize: '25px', 
            fontWeight: 'bold',
          }}> All Applications</h1>

          <CreateAppButton className="createAppCon" onAddApp={addApp} />

        </div>

        <div className="appBox">

          {apps.map((app, index) => (

            <App key={app.id || index} name={app.name} {...app} />

          ))}

        </div>
      </div>
    </div>
  );
};

export default AppContainer;


